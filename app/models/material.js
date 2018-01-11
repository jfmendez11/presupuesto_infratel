var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialSchema = new Schema({
  descripcion: {type: String, required: true, index: {unique: true }},
  unidad: {type: String, required: true},
  valorUnitMat: {type: Number, required: true},
  cantidad: {type: Number, required: false}, //Ingresada por el usuario
  valorTotMat: {type: Number, required: false}, //Sería el valor unitario del material*cantidad
  clase: {type: String, required: true},
  tipo: {type: String, required: true}
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model('Material', MaterialSchema);
