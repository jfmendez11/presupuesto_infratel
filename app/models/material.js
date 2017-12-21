var mongoose = require('mongoose');
var schem = mongoose.Schema;

var materialSchem = new Schema({
  descripicion: {type: String, required: true},
  unidad: {type: String, required: true},
  valorUnitMat: {type: Number, required: true},
  cantidad: {type: Number, required: false}, //Ingresada por el usuario
  valorTotMat: {type: Number, required: false}, //Sería el valor unitario del material*cantidad
  clase: {type: String, required: true},
  tipo: {type: String, required: true},
  codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model('Material', materialSchem);
