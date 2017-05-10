'use strict';

module.exports = function(app) {

  if (process.env.NODE_ENV == "test") {
    console.log('\nServidor iniciado [TEST]');
  } else if (process.env.NODE_ENV == "production") {
    console.log('\nServidor iniciado [PRODUCTION]');
  } else  {
    // Por defecto se ejecuta en modo DEVELOPMENT
    app.src.db.sequelize.sync().then(() => {
      // Obtenemos el puerto sobre el que se ejecutará la aplicación
      var port = process.env.PORT || app.get('port')
      // Ejecutamos el servidor
      app.listen(port, function() {
        console.log(`\nServidor iniciado [DEVELOPMENT] en el puerto ${port}`);
      });
    });
  }

}
