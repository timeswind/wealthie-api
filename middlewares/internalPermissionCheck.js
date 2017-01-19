module.exports = function () {
  return function* internalPermissionCheck (next) {
    let urlArray = this.request.url.split('/')
    if (urlArray[1] === 'internal') {
      if (this.state.user.role <= 100) {
        this.status = 400;
        this.body = 'Permission Denied';
      }
    }
    yield next
  }
}
