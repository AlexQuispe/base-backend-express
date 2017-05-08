module.exports = {
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
  jwtSession: { session: false },
  puerto: 8000, // Puerto sobre el que se ejecutará la aplicación
};
