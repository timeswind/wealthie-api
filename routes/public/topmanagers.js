var Models = require('../../lib/core');
var $List = Models.$List;
var $User = Models.$User;

exports.get = function* () {
  var listInfo = yield $List.getLatest(10, "name advisor affiliation independent categories brief profileImage")

  if (listInfo) {
    this.status = 200
    this.body = {
      success: true,
      topmanagers: listInfo
    }
  } else {
    this.status = 404
    this.body = {
      success: false,
      listInfo: null,
      error: "No list found !"
    }
  }

};
