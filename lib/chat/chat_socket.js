const sio = require('socket.io')
const _ = require('lodash')
const publicKey = require('fs').readFileSync('platform.rsa.pub')
const jwt_decode = require('jwt-decode')
const Models = require('../core');
const $Message = Models.$Message;
const chatDataService = require('./chat_data_service.js');
var Contactlist = require('../../models').Contactlist;

exports.start = function (server) {
  const chatSocketServer = sio(server).of('/chat')
  const connections = []
  const connectionDic = {}

  chatSocketServer.on('connection', socket => {
    var SOCKET_ID = socket.id
    connections.push(socket)

    socket.on('chatMessage', data => {
      console.log(data)
      const validData = _.has(data, 'message.to') &&  _.has(data, 'message.fromName') && !_.isEmpty(data, 'message.to')
      if (validData) {
        const receiverID = data.message.to
        const receiverSOCKETID = _.findKey(connectionDic, function(o) { return o == receiverID });
        if (receiverSOCKETID) {
          chatSocketServer.to(receiverSOCKETID).emit('chatMessage', data.message)
        } else {
          console.log('receiver is offline')
        }
        $Message.newMessage(data.message)
      }
    })

    socket.on('getMessageHistory', data => {
      console.log('getMessageHistory', data)
      const targetUserId = data.contactid
      const user_id = connectionDic[SOCKET_ID]
      chatDataService.getMessageHistory(user_id, targetUserId, function(err, messages) {
        if (!err) {
          socket.emit('receiveMessageHistory', {contactid: targetUserId, messages: messages})
        } else {
          console.log(err)
        }
      })

    })

    // socket.on('getContactlist', data => {
    //   let user_id = connectionDic[SOCKET_ID]
    //   chatDataService.addToContactlist(user_id, function(err, contactlist) {
    //     if (!err) {
    //       socket.emit('receiveContactlist', contactlist)
    //     }
    //   })
    // })

    socket.on('addToContactlist', data => {
      if ('contactid' in data) {
        let user_id = connectionDic[SOCKET_ID]
        let contactid = data.contactid
        chatDataService.addToContactlist(user_id, contactid)
      }
    })

    socket.on('registerToken', data => {
      const validData = _.has(data, 'token') && !_.isEmpty(data, 'token')
      if (validData) {
        const index = connections.indexOf(socket)
        const token = data.token
        const decoded = jwt_decode(token)
        const user_id = decoded.id

        connectionDic[SOCKET_ID] = user_id
        socket.emit('registerTokenSuccess')
        chatDataService.getContactlist(user_id, function(err, contactlist) {
          if (!err) {
            socket.emit('receiveContactlist', contactlist)
          }
        })
      }
    })

    socket.on('deRegisterToken', data => {
      const index = connections.indexOf(socket)
      connections.splice(index, 1)
      delete connectionDic[SOCKET_ID]
    })

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket)
      connections.splice(index, 1)
      delete connectionDic[SOCKET_ID]
    })
  })

}
