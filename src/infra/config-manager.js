import path from 'path';
import favicon from 'serve-favicon';
import baseManager from './base-manager';

const configManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        var config = require('../../webpack/webpack.config.dev.client.js');
        var compiler = require('webpack')(config);
        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: false,
            hot:true,
            inline: true,
            publicPath: config.output.publicPath,
            stats: {
            colors: true
            }
        }));
        app.use(require('webpack-hot-middleware')(compiler));
    },
    configureProductionEnv(app) {
        app.use(favicon(path.join(__dirname, '../../dist', 'favicon.ico')))
        app.set('views', path.join(__dirname, '../../dist'))
        app.set('view engine', 'ejs')
    }
});

export default configManager;