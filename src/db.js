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

    var dirModels = path.join(__dirname, "models");
    fs.readdirSync(dirModels).forEach(dir => {
      if(fs.statSync(`${dirModels}/${dir}`).isDirectory()){
        var subDirModels = path.join(dirModels, dir);
        fs.readdirSync(subDirModels).forEach(file => {
          var pathFile = path.join(subDirModels, file);
          var model = sequelize.import(pathFile);
          db.models[model.name] = model;
        });
      }
    });
    
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    });
  }

  return db;
};
