import FS from 'fs';
import express from 'express';
import axios from 'axios';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import baseManager from './base-manager';
import routes from '../routes';
import ContextWrapper from '../components/common/ContextWrapper';
import configureStore from '../store/configureStore';

const routeManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        const apiRouter = this.createApiRouter();
        const pagesRouter = this.createPageRouter();
        app.use('/api', apiRouter);            
        app.use('/', pagesRouter);            
    },

    createPageRouter() {
        const router = express.Router();
        let that = this;
        router.get('*', function (req, res) {
          match({routes, location: req.originalUrl}, (err, redirectLocation, renderProps) => {
            console.log('routes',routes);
            console.log('requ',req.originalUrl);
            if (err) {
              res.status(500).send(err.message)
            }else if(redirectLocation) {
              res.redirect(302, redirectLocation.pathname + redirectLocation.search)  
            }else if(renderProps) {
                console.log('renderProps',renderProps);
                console.log('redirectLocation',redirectLocation);
                const {promises, components} = that.mapComponentsToPromises(
                    renderProps.components, renderProps.params);

                Promise.all(promises).then((values) => {
                    const data = that.prepareData(values, components);
                    const html = that.renderHtml(renderProps, data);

                    res.render('index', {
                        content: html,
                        context: JSON.stringify(data)
                    });
                }).catch((err) => {
                    res.status(500).send(err);
                });
            }else {
                res.status(404).send('Not found')
            }
          });
        });
        return router;
    },
    createApiRouter(app) {
        const router = express.Router();

        this.createLastestBillsRoute(router);
        this.createDetailedBillRoute(router);        
        return router;
    },
    mapComponentsToPromises(components, params) {
        const filteredComponents = components.filter((Component) => {
            return (typeof Component.loadAction === 'function');
        });

        const promises = filteredComponents.map(function(Component) {
            return Component.loadAction(params, 'http://localhost:3000');                  
        });

        return {promises, components: filteredComponents};
    },
    prepareData(values, components) {
        const map = {};

        values.forEach((value, index) => {
            map[components[0].NAME] = value.data;
        });

        return map;
    },
    renderHtml(renderProps, data) {
        const history = createMemoryHistory();
        const store = configureStore({}, history);  
        let html = renderToString(
        <Provider store={store}>
            <ContextWrapper data={data}>
                <RouterContext {...renderProps}/>
            </ContextWrapper>
        </Provider>
        );

        return html;
    },
    createLastestBillsRoute(router) {
        router.get('/latest-bills', (req, res) => {
            this.retrieveLatestBills((err, data) => {
                if(!err) {
                    res.json(data);                                    
                } else {
                    res.status(500).send(err);
                }
            });
        });
    },

    createDetailedBillRoute(router) {
        router.get('/bill/:id', (req, res) => {
            const id = req.params.id;

            this.retrieveDetailedBills((err, data) => {
                if(!err) {
                    const billData = data.items.filter((item) => {
                        return item.id === id;
                    })[0];

                    res.json(billData);                                    
                } else {
                    res.status(500).send(err);
                }
            });
        });
    },
    retrieveLatestBills(callback) {
        FS.readFile('./app/fixtures/latest-bills.json', 'utf-8', (err, content) => {
            callback(err, JSON.parse(content));
        });
    },

    retrieveDetailedBills(callback) {
        FS.readFile('./app/fixtures/detailed-bills.json', 'utf-8', (err, content) => {
            callback(err, JSON.parse(content));
        });
    }
});

export default routeManager;