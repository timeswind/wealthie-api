var Siteblog = require('../models').Siteblog;
//新建一个LIST
exports.create = function (data) {
  return Siteblog.create(data);
};
