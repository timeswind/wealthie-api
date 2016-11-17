var Models = require('../../lib/core');
var $List = Models.$List;
var $User = Models.$User;

exports.get = function* () {
  let query = this.request.query
  if (query.categories) {
    var categories = this.request.query.categories.split(',').map(Number)
  }
  var page = 1
  var listPerPage = 10
  if (query.page) {
    page = query.page
  }
  var lat = this.request.query.lat
  var long = this.request.query.long
  var coordinate = [parseFloat(long), parseFloat(lat)]
  // var maxDistance = 10/111.2
  var listInfoCount = yield $List.combineSearch(categories, coordinate, "name independent affiliation categories brief phones addresses profileImage specialties", {count: true})
  var listInfo = yield $List.combineSearch(categories, coordinate, "name independent affiliation categories brief phones addresses profileImage specialties", {listPerPage: listPerPage, page: page})

  if (listInfo && listInfoCount) {
    this.status = 200
    this.body = {
      success: true,
      count: listInfoCount,
      listInfo: listInfo
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
