/* global require */
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var config = require("../../../config");
var superSecret = config.secret;
var Proyecto = require("../../models/proyecto");
var Item = require("../../models/item");
var HyE = require("../../models/herramientaYEquipoItem");
var Material = require("../../models/materialItem");
var Mo = require("../../models/manoDeObraItem");
var Transporte = require("../../models/transporteItem");

module.exports = function (app, express) {

  var apiRouter = express.Router();
  var itemSize;
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

  //CRUD para ruta http://localhost:8080/proyectos

  apiRouter.route("/")

    .post(function (req, res) {
      var proyect = new Proyecto();
      proyect.nombre = req.body.nombre;

      proyect.save(function (err) {
        if (err) {
          if (err.code == 11000)
            return res.json({ success: false, message: "Ya existe un proyecto con este nombre." });
          else
            return res.send(err);
        }
        return res.json({ message: "Proyecto creado." });
      });
    })

    .get(function (req, res) {
      Proyecto.find({}, function (err, proyectos) {
        if (err) res.send(err);

        res.json(proyectos);
      });
    });

  //CRUD para ruta http://localhost:8080/proyectos/:id_proyecto

  apiRouter.route("/:id_proyecto")

    .get(function (req, res) {
      Proyecto.findById(req.params.id_proyecto, function (err, proyecto) {
        if (err) res.send(err);

        // return that user
        res.json(proyecto);
      });
    })

    .put(function (req, res) {
      Proyecto.findById(req.params.id_proyecto, function (err, proyecto) {
        if (err) res.send(err);
        if (req.body.nombre) proyecto.nombre = req.body.nombre;

        proyecto.save(function (err) {
          if (err) res.send(err);

          res.json({ message: "Proyecto actualizado." });
        });
      });
    })

    .delete(function (req, res) {
      Proyecto.remove({
        _id: req.params.id_proyecto
      }, function (err, proyecto) {
        if (err) res.send(err);

        res.json({ message: "Proyecto eliminado." });
      });
    });

  //CRUD para ruta http://localhost:8080/proyectos/:id_proyecto/items
  apiRouter.route("/:id_proyecto/items")

    .post(function (req, res) {
      var item = new Item();

      Proyecto.findById(req.params.id_proyecto, function (err, proyecto) {
        if (err) res.send(err);
        //TO-DO verificar que el item no existe.
        if (proyecto != null) {
          item.descripcion = req.body.descripcion;
          item.unidad = req.body.unidad;
          item.cantidad = req.body.cantidad;
          item.idProyecto = req.params.id_proyecto;
          item.save(function (err) {
            if (err) {
              if (err.code == 11000) return res.json({
                message: "El item ya existe."
              });
              else return res.send(err);
            } else {
              res.json({
                message: "Item creado."
              });
            }
          });
        } else return res.json({
          message: "El proyecto con ese id no existe."
        });
      });
    })

    .get(function (req, res) {
      Item.find({ idProyecto: req.params.id_proyecto },
        function (err, items) {
          if (err) res.send(err);

          // return that user
          res.json(items);
        });
    });

  //CRUD para ruta http://localhost:8080/proyectos/:id_proyecto/items/:id_item
  apiRouter.route("/:id_proyecto/items/:id_item")

    .get(function (req, res) {
      Item.findOne({ idProyecto: req.params.id_proyecto, _id: req.params.id_item },
        function (err, item) {
          if (err) res.send(err);

          res.json(item);
        });
    })

    .put(function (req, res) {
      Item.findOne({ idProyecto: req.params.id_proyecto, _id: req.params.id_item },
        function (err, item) {
          if (err) res.send(err);

          if (req.body.descripcion) item.descripcion = req.body.descripcion;
          if (req.body.unidad) item.unidad = req.body.unidad;
          if (req.body.cantidad) item.cantidad = req.body.cantidad;

          item.save(function (err) {
            if (err) res.send(err);

            res.json({ message: "Item actualizado." });
          });
        });
    })

    .delete(function (req, res) {
      Item.remove({
        _id: req.params.id_item,
        idProyecto: req.params.id_proyecto
      }, function (err, item) {
        if (err) res.send(err);

        res.json({ message: "Item eliminado." });
      });
    });


    

  return apiRouter;
};
