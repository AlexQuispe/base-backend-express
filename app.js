'use strict';
var express = require('express');
var consign = require('consign');
var path = require('path');

// Creamos el servidor
var app = express();

// Configuramos la carpeta que contiene las vistas y el motor de vistas.
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Ejecutamos scripts de forma azíncrona
consign()
// Archvos de configuración
.include("src/config/config.js")
.then("src/db.js")
// Middlewares
.then("src/middlewares/index.js")
// Rutas
.then("src/routes")
// Archivo de ejecución
.then("src/boot.js")
.into(app);

module.exports = app;
