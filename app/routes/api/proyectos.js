/* global require */
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const superSecret = config.secret;
const Proyecto = require("../../models/proyecto");
const Item = require("../../models/item");
const HyE = require("../../models/herramientaYEquipoItem");
const Material = require("../../models/materialItem");
const Mo = require("../../models/manoDeObraItem");
const Transporte = require("../../models/transporteItem");

module.exports = function (app, express) {

  let apiRouter = express.Router();
  let itemSize;
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

  //CRUD para ruta http://localhost:8080/proyectos

  apiRouter.route("/")

    .post(function (req, res) {
      let proyect = new Proyecto();
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
      let item = new Item();

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
      Item.findById(req.params.id_item ,
        function (err, item) {
          if (err) res.send(err);

          res.json(item);
        });
    })

    .put(function (req, res) {
      Item.findById(req.params.id_item,
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

    ////////////////////////CRUD para materia prima/////////////////////////////////////
    //Materiales: http://localhost:8080/proyectos/:id_proyecto/items/:id_item/materiales
    apiRouter.route("/:id_proyecto/items/:id_item/materiales")
    .post(function (req, res) {
      let materialI = new Material();
      materialI.valorUnit = req.body.valorUnit;
      materialI.item = req.params.id_item;
      materialI.material = req.body.material;

      materialI.save(function (err) {
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
      Material.find({}, function (err, materiales) {
        if (err) res.send(err);
        
        res.json(materiales);
      });
    });

    //Materiales: http://localhost:8080/proyectos/:id_proyecto/items/:id_item/materiales/:id_material
    apiRouter.route("/:id_proyecto/items/:id_item/materiales/:id_material")

    .get(function(req, res) {
      Material.findOne({item: req.params.id_item, _id: id_material}, 
        function(err, material) {
          if(err) res.send(err);

          res.json(material);
        }
      );
    })
    
    .put(function (req, res) {
      Material.findById(req.params.id_material, function (err, material) {
        if(err) res.send(err);

        if(req.body.valorUnit) material.valorUnit = req.body.valorUnit;

        material.save(function (err) {
          if (err) res.send(err);

          res.json({ message: "Material actualizado." });
        });
      });
    })

    .delete(function (req, res) {
      Material.remove({
        _id: req.params.id_material,
        idItem: req.params.id_item
      }, function (err, material) {
        if (err) res.send(err);

        res.json({ message: "Material eliminado." });
      });
    });

    //HyE: http://localhost:8080/proyectos/:id_proyecto/items/:id_item/hyes
    apiRouter.route("/:id_proyecto/items/:id_item/hyes")
    .post(function (req, res) {
      let hyeI = new HyE();
      hyeI.valorUnit = req.body.valorUnit;
      hyeI.item = req.params.id_item;
      hyeI.material = req.body.material;
    
      hyeI.save(function (err) {
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
      HyE.find({}, function (err, hyes) {
        if (err) res.send(err);
            
        res.json(hyes);
      });
    });
    
    //HyE: http://localhost:8080/proyectos/:id_proyecto/items/:id_item/hyes/:id_hye
    apiRouter.route("/:id_proyecto/items/:id_item/hyes/:id_hye")
    
    .get(function(req, res) {
      HyE.findOne({item: req.params.id_item, _id: id_hye}, 
        function(err, hye) {
          if(err) res.send(err);
    
          res.json(hye);
        }
      );
    })
        
    .put(function (req, res) {
      HyE.findById(req.params.id_hye, function (err, hye) {
        if(err) res.send(err);
    
        if(req.body.valorUnit) hye.valorUnit = req.body.valorUnit;
        if(req.body.rendimiento) hye.rendimiento = req.body.rendimiento;
    
        hye.save(function (err) {
          if (err) res.send(err);
    
          res.json({ message: "Herramienta o equipo actualizado." });
        });
      });
    })
    
    .delete(function (req, res) {
      HyE.remove({
        _id: req.params.id_hye,
        idItem: req.params.id_item
      }, function (err, hye) {
        if (err) res.send(err);
    
        res.json({ message: "Herramienta o equipo eliminado." });
      });
    });

    //Trabajadores: http://localhost:8080/proyectos/:id_proyecto/items/:id_item/trabajadores
    apiRouter.route("/:id_proyecto/items/:id_item/trabajadores")
    .post(function (req, res) {
      let trabajadorI = new Mo();
      trabajadorI.valorUnit = req.body.valorUnit;
      trabajadorI.item = req.params.id_item;
      trabajadorI.material = req.body.material;

      trabajadorI.save(function (err) {
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
      Mo.find({}, function (err, trabajadores) {
        if (err) res.send(err);
        
        res.json(trabajadores);
      });
    });

    //Trabajadores: http://localhost:8080/proyectos/:id_proyecto/items/:id_item/trabajadores/:id_trabajador
    apiRouter.route("/:id_proyecto/items/:id_item/trabajadores/:id_trabajador")

    .get(function(req, res) {
      Mo.findOne({item: req.params.id_item, _id: id_trabajador}, 
        function(err, trabajador) {
          if(err) res.send(err);

          res.json(trabajador);
        }
      );
    })
    
    .put(function (req, res) {
      Mo.findById(req.params.id_trabajador, function (err, trabajador) {
        if(err) res.send(err);

        if(req.body.valorUnit) trabajador.valorUnit = req.body.valorUnit;
        if(req.body.rendimiento) trabajador.rendimiento = req.body.valorUnit;

        trabajador.save(function (err) {
          if (err) res.send(err);

          res.json({ message: "Trabajador actualizado." });
        });
      });
    })

    .delete(function (req, res) {
      Mo.remove({
        _id: req.params.id_trabajador,
        idItem: req.params.id_item
      }, function (err, trabajodr) {
        if (err) res.send(err);

        res.json({ message: "Trabajador eliminado." });
      });
    });

    //Transportes: http://localhost:8080/proyectos/:id_proyecto/items/:id_item/transportes
    apiRouter.route("/:id_proyecto/items/:id_item/transportes")
    .post(function (req, res) {
      let transporteI = new Transporte();
      transporteI.costoUnit = req.body.costoUnit;
      transporteI.item = req.params.id_item;
      transporteI.material = req.body.material;
    
      transporteI.save(function (err) {
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
      Transporte.find({}, function (err, transportes) {
        if (err) res.send(err);
            
        res.json(transportes);
      });
    });
    
    //Transportes: http://localhost:8080/proyectos/:id_proyecto/items/:id_item/transportes/:id_transporte
    apiRouter.route("/:id_proyecto/items/:id_item/transportes/:id_transporte")
    
    .get(function(req, res) {
      Material.findOne({item: req.params.id_item, _id: id_transporte}, 
        function(err, transporte) {
          if(err) res.send(err);
    
          res.json(transporte);
        }
      );
    })
        
    .put(function (req, res) {
      Transporte.findById(req.params.id_transporte, function (err, transporte) {
        if(err) res.send(err);
    
        if(req.body.valorUnit) transporte.valorUnit = req.body.valorUnit;
        if(req.body.rendimiento) transporte.rendimiento = req.body.rendimiento;
    
        transporte.save(function (err) {
          if (err) res.send(err);
    
          res.json({ message: "Transporte actualizado." });
        });
      });
    })
    
    .delete(function (req, res) {
      Transporte.remove({
        _id: req.params.id_transporte,
        idItem: req.params.id_item
      }, function (err, transporte) {
        if (err) res.send(err);
    
        res.json({ message: "Material eliminado." });
      });
    });

  return apiRouter;
};
