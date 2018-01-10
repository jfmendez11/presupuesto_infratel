var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var secret = config.secret;
var Proyecto = require('../../models/Proyecto');

module.exports = function(app, express) {

  var apiRouter = express.Router();

  //Middleware para verificar el token

  apiRouter.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, superSecret, function(err, decoded) {
        if (err) {
          res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          if (req.body.idSensor && req.body.valorMedida) fueraDeRango(req.body.idSensor, req.body.valorMedida);
          next(); // make sure we go to the next routes and don't stop here
        }
      });
    } else {
      // if there is no token return an HTTP response of 403 (access forbidden) and an error message
      res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });


  apiRouter.route('/')

    .post(function (req, res) {
      var proyect = new Proyecto();
      proyect.nombre = req.body.nombre;

      proyect.save(function (err) {
        if (err) {
          if (err.code == 11000)
            return res.json({success: false, message: 'Ya existe un proyecto con este nombre.'});
          else
            return res.send(err);
        }
        return res.json({message: 'Proyecto creado.'});
      });
    })

    .get(function (req, res) {
      Proyecto.find({}, function(err, proyectos) {
        if (err) res.send(err);

        res.json(proyectos);
      });
    });

    apiRouter.route('/:id_proyecto')

      .put(function (req, res) {
        Proyecto.findById(req.params.id_proyecto, function(err, proyecto) {
          if(err) res.send(err);
          if(req.body.nombre) proyecto.nombre = req.body.nombre;

          user.save(function(err) {
            if (err) res.send(err);

            res.json({message: 'Proyecto actualizado.'});
          });
        });
      })

      .delete(function (req, res) {
        Proyecto.remove({
          _id: req.params.id_proyecto
        }, function (err, proyecto) {
          if (err) res.send(err);

          res.json({message: 'Proyecto eliminado.'});
        });
      });

    return apiRouter;
};
