var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../../../config');
var superSecret = config.secret;
var HyE = require('../../HerramientaYEquipo');

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

  //CRUD para ruta http://localhost:8080/hye

  apiRouter.route('/')
};
