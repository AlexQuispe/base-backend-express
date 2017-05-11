'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function(app) {
  // Obtenemos las variables de configuración
  var configuracion = app.src.config.config;
  // Definimos el tipo de dato de la variable req.body
  app.use(bodyParser.json());
  // Definimos la libreria que parseará las consultas en la url
  app.use(bodyParser.urlencoded({ extended: false }));
  // Definimos la carpeta que será publica
  app.use(express.static(path.join(__dirname, '..','..','public')));
  // Definimos la ubicación del icono de la aplicación
  app.use(favicon(path.join(__dirname, '..','..','public', 'favicon.ico')));
  // Definimos el puerto sobre el que se ejecutará la aplicación
  app.set('port', configuracion.puerto);
  // Configuramos los cors.
  app.use(cors({
    "origin": "*",
    "methods": "GET,POST,PUT,DELETE,OPTIONS",
    "preflightContinue": true,
    "headers": "Content-Type, Authorization, Content-Length",
    "Access-Control-Allow-Headers": "Authorization, Content-Type"
  }));
}
