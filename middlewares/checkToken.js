module.exports = function () {
  return function* checkToken (next) {
    let urlArray = this.request.url.split('/')
    if (urlArray[1] !== 'public') {
      let token = this.headers.authorization
      if (!token) {
        this.status = 400;
        this.body = 'permission denied';
      } else if (token.substring(0, 7) !== 'Bearer ') {
        this.status = 400;
        this.body = 'invalid token format';
      } else {
        yield next
      }
    } else {
      yield next
    }
  }
}
