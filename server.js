//Llamado a los diferentes paquetes que se usaran en la aplicación
var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

//Conexión a la base de datos
mongoose.connect(config.database);

app.listen(config.port);

//Verificar que sirva
console.log('Probando inicios de la app en el puerto: ' + config.port);
