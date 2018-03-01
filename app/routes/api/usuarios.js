/* global require */
var bodyParser = require("body-parser"); // get body-parser
var User = require("../../models/usuario");
var jwt = require("jsonwebtoken");
var config = require("../../../config");

var secreto = config.secret;

module.exports = function (app, express) {
  var apiRouter = express.Router();

  apiRouter.post("/authenticate", function (req, res) {
    User.findOne({
      email: req.body.email
    }).select("email password").exec(function (err, user) {
      if (err) throw err;
      if (!user) {
        res.json({
          success: false,
          message: "Usuario no valido. Vuelva a intentarlo."
        });
      } else if (user) {
        var contrValida = user.comparePassword(req.body.password);
        if (!contraValida) {
          res.json({
            success: false,
            message: "Contraseña incorrecta. Vuelva a intentarlo."
          });
        } else {
          var token = jwt.sign({
            id: user._id,
            email: user.email
          }, secreto, {
            xpiresIn: "24h"
          });

          res.json({
            success: true,
            message: "Token listo",
            token: token
          });
        }
      }
    });
  });

  //Middlewarwe para probar el Token

  apiRouter.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, secreto, function (err, decoded) {
        if (err) {
          res.status(403).send({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next(); // make sure we go to the next routes and don"t stop here
        }
      });
    } else {
      // if there is no token return an HTTP response of 403 (access forbidden) and an error message
      res.status(403).send({
        success: false,
        message: "No token provided."
      });
    }
  });

  //Ruteo para el crud de Usuarios
  apiRouter.route("/")

    .post(function (req, res) {
      var dominio = req.body.email.split("@");
      if (dominio[1] != "infratel.com.co") {
        return res.json({
          success: false,
          message: "No tiene permiso para crear una cuenta."
        });
      } else {
        var user = new Usuario();
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function (err) {
          if (err) {
            if (err.code == 11000) return res.json({
              success: false,
              message: "Ya existe un usuario con ese email"
            });
            else return res.send(err);
          }
          res.json({
            message: "Usuario creado"
          });
        });
      }
    })

    .get(function (req, res) {
      User.find({}, function (err, users) {
        if (err) res.send(err);
        res.json(users);
      });
    });

  apiRouter.route("/:user_id")

    .get(function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) res.send(err);
        res.json(user);
      });
    })

    .put(function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) res.send(err);
        if (req.body.password) user.password = req.body.password;

        user.save(function (err) {
          if (err) res.send(err);
          res.json({
            message: "Usuario actualizado"
          });
        });
      });
    })

    .delete(function (req, res) {
      User.remove({
        _id: req.params.user_id
      }, function (err, user) {
        if (err) res.send(err);
        res.json({
          message: "Usuario eliminado."
        });
      });
    });

  return apiRouter;
};
