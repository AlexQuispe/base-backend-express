'use strict';
var send = require('../../send');

module.exports = function(model) {

  function query(req, res, next) {
    var options = getOptions(req)
    model.findAndCountAll(options)
    .then(function(result) {
      var count = result.count;
      var start = options.offset;
      var end = options.offset + options.limit;
      if (end > count) end = count;
      res.set('Content-Range', start + '-' + end + '/' + count);
      send.success200(res, result.rows);
    }).catch(function (err) {
      send.error400(res);
    });
  }

  function getOptions(req) {
    var query = req.query;
    var offset = query.offset ? parseInt(query.offset) : 0; // ?offset=1
    var limit = query.limit ? parseInt(query.limit) : 50; // ?limit=10
    var attributes = query.fields ? query.fields.split(",") : []; // ?fields=nombre,email
    var order = query.sort; // ?sort=email+desc
    var where = {}; // ?nombre=carlos
    for (var field in model.attributes) {
      if(query.hasOwnProperty(field)) where[field] = query[field];
    }
    var options = {};
    options.offset = offset;
    options.limit = limit;
    if (query.fields) options.attributes = attributes;
    if (query.sort) options.order = order;
    if (!isEmpty(where)) options.where = where;
    return options;
  };

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
      return false;
    }
    return true;
  }
  return query;
};
