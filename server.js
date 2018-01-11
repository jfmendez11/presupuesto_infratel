//Llamado a los diferentes paquetes que se usaran en la aplicación
var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev'));

//Conexión a la base de datos
mongoose.connect(config.database);

var apiRoutesProyectos = require('./app/routes/api/proyectos')(app, express);
app.use('/proyectos', apiRoutesProyectos);

app.listen(config.port);

//Verificar que sirva
console.log('Probando inicios de la app en el puerto: ' + config.port);
