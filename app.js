'use strict';
var express = require('express');
var consign = require('consign');
var path = require('path');

// Creamos el servidor
var app = express();

// Ejecutamos scripts de forma azíncrona
consign()
// Archivos de configuración de la base de datos
.include("src/config/config.js")
// Carga los módulos de sequelize
.then("src/db.js")
// Middlewares
.then("src/middlewares")
// Carga todas las rutas
.then("src/routes")
// Sobre el servidor
.into(app);

// Configuramos la carpeta que contiene las vistas y el motor de vistas.
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
// Ruta para el apidoc
app.get('/apidoc', function(req, res, next) {
  res.set('Content-Type','text/html');
  res.status(200).render('index');
});
// Ruta por defecto
app.get('/', function(req, res, next) {
  res.redirect('/apidoc');
});
// Si ninguna ruta es válida, muestra un mensaje de error
app.use(function (req, res, next) {
  res.status(404).json({error: "404", status: "Not Found", message: "El recurso no existe"});
});

if (process.env.NODE_ENV != "test") {
  // Por defecto se ejecuta en modo DEVELOPMENT
  app.src.db.sequelize.sync().then(() => {
    // Obtenemos el puerto sobre el que se ejecutará la aplicación
    var port = process.env.PORT || app.get('port')
    // Ejecutamos el servidor
    app.listen(port, function() {
      console.log(`\nServidor iniciado [DEVELOPMENT] en el puerto ${port}`);
    });
  });
} else {
  console.log('\nServidor iniciado [TEST]');
}

module.exports = app;
