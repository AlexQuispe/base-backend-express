// Importamos las dependencias
var express = require('express');
var consign = require('consign');
var path = require('path');

// Declaramos el servidor
var app = express();

// Configuramos la carpeta que contiene las VISTAS.
app.set('views', path.join(__dirname, 'src', 'views'));
// Configuramos el motor de vistas
app.set('view engine', 'ejs');

// Ejecutamos los scripts
consign()
.include("src/config/config.js")
.then("src/db.js")
.then("src/libs/middlewares.js")
.then("src/routes")
.then("src/libs/boot.js")
.into(app);

module.exports = app;
