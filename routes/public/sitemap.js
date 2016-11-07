var sm = require('sitemap');
var Models = require('../../lib/core');
var $List = Models.$List;
var moment = require('moment');

exports.get = function* () {
  var listInfo = yield $List.getAll("advisor updated_at")

  if (listInfo) {
    var urls = listInfo.map((list)=>{
      var obj = {}
      obj['url'] = '/p/' + list._id
      obj['changefreq'] = 'monthly'
      obj['priority'] = 0.7
      obj['lastmod'] = moment(list.updated_at).format('YYYY-MM-DD')
      return obj
    })
    var sitemap = sm.createSitemap ({
      hostname: 'https://wealthie.co',
      cacheTime: 600000,        // 600 sec - cache purge period
      urls: urls
    });

    var self = this

    var xml = sitemap.toXML();
    self.set('Content-Type', 'application/xml');
    self.status = 200
    self.body = xml
  }

};
