module.exports = app => {
  app.src.db.sequelize
  .sync()
  .then(() => {
    // Obtenemos el puerto sobre el que se ejecutará la aplicación
    var port = process.env.PORT || app.get('port')
    // Ejecutamos el servidor
    app.listen(port, function() {
      console.log('La aplicación esta ejecutandose sobre http://localhost:%s/', port);
    });
  });
}
