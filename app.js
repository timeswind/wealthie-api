var app = require('koa')();
var logger = require('koa-logger');
var bodyparser = require('koa-bodyparser');
var errorhandler = require('koa-errorhandler');
var gzip = require('koa-gzip');
var scheme = require('koa-scheme');
var router = require('koa-frouter');
var config = require('config-lite');
var core = require('./lib/core');
var jwt = require('koa-jwt');
var fs = require('fs');


var publicKey = fs.readFileSync('platform.rsa.pub');

app.use(jwt({ secret: publicKey, algorithm: 'RS256' }).unless({ path: [/^\/public/] }));
app.use(errorhandler());
app.use(bodyparser());
app.use(logger());
app.use(scheme(config.schemeConf));
app.use(gzip());
app.use(router(app, config.routerConf));
app.use(function *(){
  this.body = 'Hello World';
});


app.listen(config.port, function () {
  console.log('Server listening on: ', config.port);
});
