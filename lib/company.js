var Company = require('../models').Company;
//新建一个LIST
exports.newCompany = function (data) {
  return Company.create(data);
};
