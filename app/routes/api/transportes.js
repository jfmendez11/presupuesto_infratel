var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../../../config');
var superSecret = config.secret;
var Transporte = require('../../models/Transporte');

module.exports = function(app, express) {
  var apiRouter = express.Router();

  //Middleware para verificar el token

  apiRouter.use(function(req, res, next){
    /*var token = req.body.token || req.query.token || req.headers['x-access-token'];
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
          if (req.body.idSensor && req.body.valorMedida) fueraDeRango(req.body.idSensor, req.body.valorMedida);*/
          next(); // make sure we go to the next routes and don't stop here
        /*}
      });
    } else {
      // if there is no token return an HTTP response of 403 (access forbidden) and an error message
      res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }*/
  });

  //CRUD para ruta http://localhost:8080/transportes

  apiRouter.route('/')

  .post(function (req, res) {
    var transporte = new Transporte();
    transporte.descripcion = req.body.descripcion;
    transporte.unidad = req.body.unidad;
    transporte.costoUnit = req.body.costoUnit;

    transporte.save(function (err) {
      if (err) {
        if (err.code == 11000)
          return res.json({success: false, message: 'Ya existe un transporte con este nombre.'});
        else
          return res.send(err);
      }
      return res.json({message: 'Transporte creado.'});
    });
  })

  .get(function (req, res) {
    Transporte.find({}, function(err, transportes) {
      if (err) res.send(err);

      res.json(transportes);
    });
  });

  //CRUD para ruta http://localhost:8080/transportes/:id_transporte

  apiRouter.route('/:id_transporte')

    .get(function(req, res) {
      Transporte.findById(req.params.id_transporte, function(err, transporte) {
        if (err) res.send(err);

        // return that user
        res.json(transporte);
      });
    })

    .put(function (req, res) {
      Transporte.findById(req.params.id_transporte, function(err, transporte) {
        if(err) res.send(err);
        if(req.body.descripcion) transporte.descripcion = req.body.descripcion;
        if(req.body.unidad) transporte.unidad = req.body.unidad;
        if(req.body.costoUnit) transporte.costoUnit = req.body.costoUnit;

        transporte.save(function(err) {
          if (err) res.send(err);

          res.json({message: 'Transporte actualizado.'});
        });
      });
    })

    .delete(function (req, res) {
      Transporte.remove({
        _id: req.params.id_transporte
      }, function (err, transporte) {
        if (err) res.send(err);

        res.json({message: 'Transporte eliminado.'});
      });
    });
  return apiRouter;
}
