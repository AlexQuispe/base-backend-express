module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    app.src.db.sequelize
    .sync()
    .then(() => {
      // Obtenemos el puerto sobre el que se ejecutará la aplicación
      var port = process.env.PORT || app.get('port')
      // Ejecutamos el servidor
      app.listen(port, function() {
          console.log(`\nServidor iniciado en modo DEVELOPMENT sobre el puerto ${port}`);
      });
    });
  } else {
    console.log(`\nServidor iniciado en modo TEST`);
  }
}
