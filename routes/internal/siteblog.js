var Models = require('../../lib/core');
var $Siteblog = Models.$Siteblog;

exports.post = function* () {
  var newSiteblogData = this.request.body;

  var newSiteblog = yield $Siteblog.create(newSiteblogData)
  if (newSiteblog) {
    this.status = 200
    this.body = {
      success: true,
      newSiteblog: newSiteblog
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      newSiteblog: null
    }
  }

};
