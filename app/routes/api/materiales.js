/* global require */
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var config = require("../../../config");
var superSecret = config.secret;
var Material = require("../../models/material");

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

  //CRUD para ruta http://localhost:8080/materiales

  apiRouter.route("/")

    .post(function (req, res) {
      var material = new Material();
      material.descripcion = req.body.descripcion;
      material.unidad = req.body.unidad;
      material.costoUnit = req.body.costoUnit;

      material.save(function (err) {
        if (err) {
          if (err.code == 11000)
            return res.json({ success: false, message: "Ya existe un material con este nombre." });
          else
            return res.send(err);
        }
        return res.json({ message: "Material creado." });
      });
    })

    .get(function (req, res) {
      Material.find({}, function (err, materiales) {
        if (err) res.send(err);

        res.json(materiales);
      });
    });

  //CRUD para ruta http://localhost:8080/materiales/:id_material

  apiRouter.route("/:id_material")

    .get(function (req, res) {
      Material.findById(req.params.id_material, function (err, material) {
        if (err) res.send(err);

        // return that user
        res.json(material);
      });
    })

    .put(function (req, res) {
      Material.findById(req.params.id_material, function (err, material) {
        if (err) res.send(err);
        if (req.body.descripcion) material.descripcion = req.body.descripcion;
        if (req.body.unidad) material.unidad = req.body.unidad;
        if (req.body.costoUnit) material.costoUnit = req.body.costoUnit;

        material.save(function (err) {
          if (err) res.send(err);

          res.json({ message: "Material actualizado." });
        });
      });
    })

    .delete(function (req, res) {
      Material.remove({
        _id: req.params.id_material
      }, function (err, material) {
        if (err) res.send(err);

        res.json({ message: "Material eliminado." });
      });
    });

  return apiRouter;
};
