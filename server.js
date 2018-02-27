//Llamado a los diferentes paquetes que se usaran en la aplicación
var config = require("./config");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require("morgan");
var path = require("path");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
  next();
});

app.use(morgan("dev"));

//Conexión a la base de datos
mongoose.connect(config.database);

app.use(express.static(__dirname + "/public"));

var apiRoutesProyectos = require("./app/routes/api/proyectos")(app, express);
app.use("/proyectos", apiRoutesProyectos);

var apiRoutesHyE = require("./app/routes/api/herramientasYEquipos")(app, express);
app.use("/hye", apiRoutesHyE);

var apiRoutesMateriales = require("./app/routes/api/materiales")(app, express);
app.use("/materiales", apiRoutesMateriales);

var apiRoutesMO = require("./app/routes/api/trabajadores")(app, express);
app.use("/mo", apiRoutesMO);

var apiRoutesTransportes = require("./app/routes/api/transportes")(app, express);
app.use("/transportes", apiRoutesTransportes);

var apiRoutesUsuarios = require("./app/routes/api/usuarios")(app, express);
app.use("/usuarios", apiRoutesUsuarios);

app.get("*", function (req, res){
	res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});

app.listen(config.port);

//Verificar que sirva
console.log("Probando inicios de la app en el puerto: " + config.port);
