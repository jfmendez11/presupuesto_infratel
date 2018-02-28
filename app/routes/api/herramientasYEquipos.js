/* global require */
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var config = require("../../../config");
var superSecret = config.secret;
var HyE = require("../../models/herramientaYEquipo");

module.exports = function (app, express) {
  var apiRouter = express.Router();

  //Middleware para verificar el token

  apiRouter.use(function (req, res, next) {
    /*var token = req.body.token || req.query.token || req.headers["x-access-token"];
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

  //CRUD para ruta http://localhost:8080/hye

  apiRouter.route("/")

    .post(function (req, res) {
      var hye = new HyE();
      hye.descripcion = req.body.descripcion;
      hye.unidad = req.body.unidad;
      hye.costoUnit = req.body.precio;

      hye.save(function (err) {
        if (err) {
          if (err.code == 11000)
            return res.send(err);// res.json({success: false, message: "Ya existe una herramienta o equipo con este nombre."});
          else
            return res.send(err);
        }
        return res.json({ message: "Herramienta o equipo creado." });
      });
    })

    .get(function (req, res) {
      HyE.find({}, function (err, hyes) {
        if (err) res.send(err);

        res.json(hyes);
      });
    });

  //CRUD para ruta http://localhost:8080/hye/:id_herrYequip

  apiRouter.route("/:id_herrYequip")

    .get(function (req, res) {
      HyE.findById(req.params.id_herrYequip, function (err, hye) {
        if (err) res.send(err);

        // return that user
        res.json(hye);
      });
    })

    .put(function (req, res) {
      HyE.findById(req.params.id_herrYequip, function (err, hye) {
        if (err) res.send(err);
        if (req.body.descripcion) hye.descripcion = req.body.descripcion;
        if (req.body.unidad) hye.unidad = req.body.unidad;
        if (req.body.costoUnit) hye.precio = req.body.costoUnit;

        hye.save(function (err) {
          if (err) res.send(err);

          res.json({ message: "Herramienta o equipo actualizado." });
        });
      });
    })

    .delete(function (req, res) {
      HyE.remove({
        _id: req.params.id_herrYequip
      }, function (err, hye) {
        if (err) res.send(err);

        res.json({ message: "Herramienta o equipo eliminado." });
      });
    });
  return apiRouter;
};
