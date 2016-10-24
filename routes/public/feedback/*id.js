var Models = require('../../../lib/core');
var $FeedbackTemplate = Models.$FeedbackTemplate;
var $Feedback = Models.$Feedback;
var $Client = Models.$Client;
var $User = Models.$User;
var _ = require('lodash')

exports.get = function* (id) {
  var feedbackTemplate = yield $FeedbackTemplate.findOneById(id, { lean: true })
  if (feedbackTemplate) {
    this.status = 200
    this.body = {
      success: true,
      feedbackTemplate: feedbackTemplate
    }
  } else {
    this.status = 400
    this.body = {
      success: false,
      feedbackTemplate: null
    }
  }
};

exports.post = function* (id) {
  var feedbackTemplate = yield $FeedbackTemplate.findOneById(id, { lean: false })

  if (feedbackTemplate) {
    var newFeedbackData = {
      responses: []
    }
    newFeedbackData['template'] = feedbackTemplate._id
    var feedbackResponse = []
    let email = this.request.body.email
    let advisor_id = feedbackTemplate.advisor
    newFeedbackData['advisor'] = advisor_id
    var user = yield $User.getUserByEmail(email)

    if (user && user.role !== 1) {
      this.status = 400
      this.body = {
        success: false,
        error: 'user role incorrect'
      }
    } else {
      var client = yield $Client.getByEmail(advisor_id, email, "name email phone gender married note categories age childrens job income")
      let fields = feedbackTemplate.fields

      if (user && client) {
        newFeedbackData['user'] = user._id
        newFeedbackData['client'] = client._id
        if (client.user != user._id) {
          client.user = user._id
          yield client.save()
        }
      } else if (!user && client) {
        newFeedbackData['client'] = client._id
        // invite user to join wealthie
      } else if (user && !client && email) {
        var newClient = yield $Client.newClient({
          advisor: advisor_id,
          name: user.firstName + " " + user.lastName,
          email: email
        })
        newFeedbackData['user'] = user._id
        newFeedbackData['client'] = newClient._id
      } else if (!user && !client && email && this.request.body.name) {
        var newClient = yield $Client.newClient({
          advisor: advisor_id,
          name: this.request.body.name,
          email: email
        })
        newFeedbackData['client'] = newClient._id
      }

      var fieldsDictionary = {}
      var responses = this.request.body

      _.forIn(responses, function(value, key) {
        if (key !== 'email') {
          var object = _.find(fields, function(o) { return o._id == key; })
          if (object) {
            object['response'] = value
            fieldsDictionary[key] = object
          } else {
            fieldsDictionary[key] = null
          }
        }
      })

      console.log(fieldsDictionary)

      _.forIn(fieldsDictionary, function(value, key) {
        if (value) {
          newFeedbackData.responses.push({
            fid: key,
            data: value.response
          })
        }
      })

      console.log(newFeedbackData)

      newFeedbackData['complete'] = true

      var statistic = []
      if (feedbackTemplate.statistic) {
        statistic = feedbackTemplate.statistic
        _.forIn(fieldsDictionary, function(value, key) {
          if (value) {
            if (_.find(statistic, function(o){ return o.fid == key })) {
              var datas = _.get(_.find(statistic, function(o){ return o.fid == key; }), 'datas', null)
              if (datas) {
                let stat_index = _.findIndex(statistic, function(o) { return o.fid == key; });
                datas = JSON.parse(datas)
                if (value.type === 'mc') {
                  if (_.has(datas, value['response'])) {
                    datas[value['response']] = datas[value['response']] + 1
                  } else {
                    datas[value['response']] = 1
                  }
                } else if (value.type === 'rate') {
                  if (_.has(datas, value['response'])) {
                    datas[value['response']] = datas[value['response']] + 1
                  } else {
                    datas[value['response']] = 1
                  }
                }
                statistic[stat_index]['datas'] = JSON.stringify(datas)
              }
            } else {
              var datas = {}
              if (value.type === 'mc') {
                datas[value['response']] = 1
              } else if (value.type === 'rate') {
                datas[value['response']] = 1
              }
              statistic.push({
                'fid': key,
                'datas': JSON.stringify(datas)
              })
            }
          }
        })
        feedbackTemplate.save()
      } else {
        _.forIn(fieldsDictionary, function(value, key) {
          if (value) {
            var datas = {}
            if (value.type === 'mc') {
              datas[value['response']] = 1
            } else if (value.type === 'rate') {
              datas[value['response']] = 1
            }
            statistic.push({
              'fid': key,
              'datas': JSON.stringify(datas)
            })
          }
        })
        feedbackTemplate.save()
      }
      var newFeedback = yield $Feedback.addOne(newFeedbackData)
      if (newFeedback) {
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
  }
};
