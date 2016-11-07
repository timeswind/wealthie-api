var Models = require('../../../lib/core');
var $List = Models.$List;

exports.get = function* () {
  var listInfo = yield $List.getAllUnclaimed('name email phone affiliation brief room address experience updated_at categories')

  if (listInfo) {
    this.status = 200
    this.body = {
      success: true,
      listInfo: listInfo
    }
  } else {
    this.status = 404
  }
};

exports.post = function* () {
  var data = this.request.body;
  data['public'] = true;
  data['listBy'] = this.state.user.id;
  if (data.affiliation) {
    data['independent'] = false;
  } else {
    data['independent'] = true;
  }
  console.log(data)
  var newListInfo = yield $List.createList(data);
  if (newListInfo) {
    this.status = 200;
    this.body = {
      success: true
    };
    return true
  } else {
    this.status = 500;
    this.body = {
      success: false,
      error: "Something went wrong"
    };
  }
};

exports.PUT = function* () {
  var update = this.request.body;
  if (update.affiliation) {
    update['independent'] = false;
  } else {
    update['independent'] = true;
  }
  var findListAndUpdate = yield $List.updateUnclaimed(update._id, update);
  if (findListAndUpdate) {
    this.status = 200;
    this.body = {
      success: true
    };
    return true
  } else {
    this.status = 500;
    this.body = {
      success: false,
      error: "Something went wrong"
    };
  }
};
