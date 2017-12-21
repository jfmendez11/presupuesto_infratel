var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hyeSchem = new Schema({
  descripcion: {type: String, required: true},
  unidad: {type: String, required: true},
  precio: {type: Number, required: true},
  rendimiento: {type: Number, required: false}, //Ingresado por le usuario
  valorUnit: {type: Number, required: true},
  codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model('HyE', hyeSchem);
