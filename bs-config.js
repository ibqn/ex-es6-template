'use strict';
//var log = require('connect-logger');
var proxy = require('http-proxy-middleware');
/*
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 */
module.exports = {
  injectChanges: true,
  files: ['./**/*.{css,js,sass,pug}'],
  watchOptions: {
    ignored: 'node_modules'
  },

  port: 8000,
  server: {
    middleware: [
      //log({ format: '%date %status %method %url' }),
      proxy('/', { target: 'http://localhost:3000' }),
    ]
  }
};
