// Importamos las dependencias
var express =     require('express');
var path =        require('path');
var favicon =     require('serve-favicon');
var bodyParser =  require('body-parser');

// Importamos los CONTROLADORES de las rutas
var index = require('./src/routes/index');
var users = require('./src/routes/users');

// Declaramos el servidor
var app = module.exports = express();

// Configuramos la carpeta que contiene las VISTAS.
app.set('views', path.join(__dirname, 'src', 'views'));
// Configuramos el motor de vistas
app.set('view engine', 'ejs');

// Definimos el tipo de dato de la variable req.body
app.use(bodyParser.json());
// Define la libreria que parseará las consultas en la url
app.use(bodyParser.urlencoded({ extended: false }));
// Definimos la carpeta que será publica
app.use(express.static(path.join(__dirname, 'public')));
// Definimos la ubicación del icono de la aplicación
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Asignamos los CONTROLADORES a las rutas
app.use('/', index);
app.use('/users', users);

// Definimos el puerto sobre el que se ejecutará la aplicación
var port = process.env.PORT || 8000

// Ejecutamos el servidor
app.listen(port, function() {
  console.log('La aplicación esta ejecutandose sobre http://localhost:%s/', port);
});
