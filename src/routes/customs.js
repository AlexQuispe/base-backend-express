'use strict';

module.exports = function(app) {

  app.get('/customs', function(req, res) {
    res.status(200).json({"status":"Success"});
  });

};
