import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import routes from './routes'
import ContextWrapper from './components/common/ContextWrapper';

export default function render(req, res) {
  match({routes, location: req.originalUrl}, (err, redirectLocation, renderProps) => {
      const {promises, components} = mapComponentsToPromises(
          renderProps.components, renderProps.params);

      Promise.all(promises).then((values) => {
          const data = prepareData(values, components);
          const html = renderHtml(renderProps, data);

          res.render('index', {
              content: html,
              context: JSON.stringify(data)
          });
      }).catch((err) => {
          res.status(500).send(err);
      });
  });
}

function mapComponentsToPromises(components, params) {
    const filteredComponents = components.filter((Component) => {
        return (typeof Component.loadAction === 'function');
    });

    const promises = filteredComponents.map(function(Component) {
        return Component.loadAction(params, 'http://localhost:3000');                  
    });

    return {promises, components: filteredComponents};
}

function prepareData(values, components) {
    const map = {};

    values.forEach((value, index) => {
        map[components[0].NAME] = value.data;
    });

    return map;
}

function renderHtml(renderProps, data) {
    const history = createMemoryHistory();
    const store = configureStore({}, history);  
    let html = renderToString(
      <Provider store={store}>
        <ContextWrapper data={data}>
            <RoutingContext {...renderProps}/>
        </ContextWrapper>
      </Provider>
    );

    return html;
}