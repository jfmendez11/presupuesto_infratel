/* global require */
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const superSecret = config.secret;
const Mo = require("../../models/manoDeObra");

module.exports = function (app, express) {
  let apiRouter = express.Router();

  //Middleware para verificar el token

  apiRouter.use(function (req, res, next) {
    /*let token = req.body.token || req.query.token || req.headers["x-access-token"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, superSecret, function(err, decoded) {
        if (err) {
          res.status(403).send({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          if (req.body.idSensor && req.body.valorMedida) fueraDeRango(req.body.idSensor, req.body.valorMedida);*/
    next(); // make sure we go to the next routes and don"t stop here
    /*}
  });
} else {
  // if there is no token return an HTTP response of 403 (access forbidden) and an error message
  res.status(403).send({
    success: false,
    message: "No token provided."
  });
}*/
  });

  //CRUD para ruta http://localhost:8080/mo

  apiRouter.route("/")

    .post(function (req, res) {
      let trabajador = new Mo();
      trabajador.tipoDePersona = req.body.tipoDePersona;
      trabajador.unidad = req.body.unidad;
      trabajador.costoUnit = req.body.costoUnit;

      trabajador.save(function (err) {
        if (err) {
          if (err.code == 11000)
            return res.json({ success: false, message: "Ya existe una persona de este tipo." });
          else
            return res.send(err);
        }
        return res.json({ message: "Mano de obra creada." });
      });
    })

    .get(function (req, res) {
      Mo.find({}, function (err, trabajadores) {
        if (err) res.send(err);

        res.json(trabajadores);
      });
    });

  //CRUD para ruta http://localhost:8080/mo/:id_mo

  apiRouter.route("/:id_mo")

    .get(function (req, res) {
      Mo.findById(req.params.id_mo, function (err, trabajador) {
        if (err) res.send(err);

        // return that user
        res.json(trabajador);
      });
    })

    .put(function (req, res) {
      Mo.findById(req.params.id_mo, function (err, trabajador) {
        if (err) res.send(err);
        if (req.body.tipoDePersona) trabajador.tipoDePersona = req.body.tipoDePersona;
        if (req.body.unidad) trabajador.unidad = req.body.unidad;
        if (req.body.costo) trabajador.costo = req.body.costoUnit;

        trabajador.save(function (err) {
          if (err) res.send(err);

          res.json({ message: "Trabajador actualizado." });
        });
      });
    })

    .delete(function (req, res) {
      Mo.remove({
        _id: req.params.id_mo
      }, function (err, trabajador) {
        if (err) res.send(err);

        res.json({ message: "Trabajador eliminado." });
      });
    });
  return apiRouter;
};
