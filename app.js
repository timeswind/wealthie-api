var app = require('koa')();
var raven = require('raven');
var sentry = new raven.Client('https://b03d70e23cb849e1aa7c90f17fb9ace0:81af625093254b92b6e92bb8469e3818@sentry.io/101580');
var logger = require('koa-logger');
var bodyparser = require('koa-bodyparser');
var errorhandler = require('koa-errorhandler');
var compress = require('koa-compress')
var scheme = require('koa-scheme');
var router = require('koa-frouter');
var config = require('config-lite');
var core = require('./lib/core');
var jwt = require('koa-jwt');
var fs = require('fs');
var publicKey = fs.readFileSync('platform.rsa.pub');

// app.on('error', function(err) {
//   sentry.captureException(err);
// });

app.use(function *(next){
  if (this.headers.authorization) {
    let token = this.headers.authorization
    if (token.substring(0, 7) !== 'Bearer ') {
      this.status = 400;
      this.body = 'invalid token format';
    } else {
      yield next
    }
  } else {
    yield next
  }
});
app.use(jwt({ secret: publicKey, algorithm: 'RS256' }).unless({ path: [/^\/public/] }));
app.use(errorhandler());
app.use(bodyparser());
app.use(logger());
app.use(scheme(config.schemeConf));
app.use(compress())
app.use(router(app, config.routerConf));
app.use(function *(){
  this.body = 'Hello World';
});


app.listen(config.port, function () {
  console.log('Server listening on: ', config.port);
});
