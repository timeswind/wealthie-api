var Models = require('../../../lib/core');
var _ = require('lodash');
var $SharelistClient = Models.$Sharelist;

exports.get = function* () {
  var user_id = this.state.user.id

  var sharelistclients = yield $SharelistClient.getSharelistClients(user_id, "manager name email phone referBy joinAt fields isActive note address")

  if (sharelistclients) {
    this.status = 200
    this.body = {
      success: true,
      sharelistclients: sharelistclients
    }
  } else {
    this.status = 404
    this.body = {
      success: false,
      sharelistclients: null
    }
  }
};

exports.post = function* () {
  var user_id = this.state.user.id
  var newSharelistClientData = this.request.body
  newSharelistClientData['advisor'] = user_id
  var newSharelistClient = yield $SharelistClient.newSharelistClient(newSharelistClientData)

  if (newSharelistClient) {
    this.status = 200
    this.body = {
      success: true,
      sharelistclient: newSharelistClient
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      sharelistclient: null
    }
  }
}

exports.put = function*() {
  var user_id = this.state.user.id
  var updatedSharelistclientDataCopy = JSON.parse(JSON.stringify(this.request.body))
  var updatedSharelistclientData = this.request.body
  let sharelistclient_id = updatedSharelistclientData._id

  delete updatedSharelistclientData._id
  if (updatedSharelistclientData.advisor) {
    delete updatedSharelistclientData.advisor
  }

  var updatedSharelistclient = yield $SharelistClient.updateSharelistClient(sharelistclient_id, updatedSharelistclientData)
  if (updatedSharelistclient) {
    this.status = 200
    this.body = {
      success: true,
      sharelistclient: updatedSharelistclientDataCopy
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      sharelistclient: null
    }
  }
}

exports.delete = function*() {
  var user_id = this.state.user.id
  var sharelistclient_id = this.request.query.id

  var sharelistclientDeleted = yield $SharelistClient.deleteSharelistClient(sharelistclient_id)

  if (sharelistclientDeleted) {
    this.status = 200
    this.body = {
      success: true
    }
  } else {
    this.status = 500
    this.body = {
      success: false
    }
  }
}
