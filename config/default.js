var path = require('path');

module.exports = {
  port: process.env.PORT || 8080,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/platform'
  },
  schemeConf: path.join(__dirname, './default.scheme'),
  routerConf: { wildcard: '_', root: 'routes' }
};
