var Models = require('../../lib/core');
var $List = Models.$List;
var $User = Models.$User;

exports.get = function* () {
  if (this.request.query.categories) {
    var categories = this.request.query.categories.split(',').map(Number)
  }
  var lat = this.request.query.lat
  var long = this.request.query.long
  var coordinate = [parseFloat(long), parseFloat(lat)]
  // console.log(loc)
  // var maxDistance = 10/111.2
  var listInfo = yield $List.getLatest(10, "advisor affiliation categories brief")

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
