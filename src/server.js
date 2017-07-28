import configManager from './infra/config-manager';
import middlewareManager from './infra/middleware-manager';
import routeManager from './infra/route-manager';
import assetsManager from './infra/assets-manager';

var express = require('express')

var app = express()
var isDev = process.env.NODE_ENV === 'development'
var defaultPort = isDev? 3000 : 8300
var port = process.env.PORT || defaultPort

configManager.handle(app);
middlewareManager.handle(app);
assetsManager.handle(app);
routeManager.handle(app);

app.listen(port, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})