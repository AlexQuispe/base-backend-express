'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var db = null;

module.exports = function(app) {

  if (!db) {
    var config = app.src.config.config;
    var sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );
    db = {
      sequelize,
      Sequelize,
      models: {}
    };

    var dir = path.join(__dirname, "models");
    fs.readdirSync(dir).forEach(file => {
      var modelDir = path.join(dir, file);
      var model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    });
  }

  return db;
};
