'use strict';

module.exports = function(app) {

  var test = {
    username: "alex",
    password: "12345678",
    database: "database_test",
    timezone: '-04:00',
    params: {
      dialect: "mysql",
      port: 3306, // mysql: 3306, postgres: 5432
      host: "localhost",
      logging: false
    },
    jwtSecret: "SECRET",
    puerto: 8000, // Puerto sobre el que se ejecutará la aplicación
  };

  var development = {
    username: "alex",
    password: "12345678",
    database: "database_development",
    timezone: '-04:00',
    params: {
      dialect: "mysql",
      port: 3306, // mysql: 3306, postgres: 5432
      host: "localhost",
      logging: false
    },
    jwtSecret: "SECRET",
    puerto: 8000, // Puerto sobre el que se ejecutará la aplicación
  };

  return (process.env.NODE_ENV != 'test') ? development : test;
};
