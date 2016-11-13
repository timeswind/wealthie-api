var Models = require('../../../lib/core');
var $List = Models.$List;

exports.get = function* () {
  var listInfo = yield $List.getAllUnclaimed('listBy name email phone affiliation brief room address experience updated_at categories profileImage')

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

exports.put = function* () {
  var update = this.request.body;
  if (update.affiliation) {
    update['independent'] = false;
  } else {
    update['independent'] = true;
  }
  update.updated_at = new Date()

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

exports.delete = function* () {
  var list_id = this.request.query.id;
  var list = yield $List.findOneUnclaimed(list_id)
  if (list) {
    var removed = yield list.remove()
    if (removed) {
      this.status = 200;
      this.body = {
        success: true
      };
    } else {
      this.status = 500;
      this.body = {
        success: false,
        error: "Something went wrong"
      };
    }
  } else {
    this.status = 500;
    this.body = {
      success: false,
      error: "List not found"
    };
  }
};
