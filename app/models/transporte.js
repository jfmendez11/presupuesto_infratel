/* global require */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TransportSchema = new Schema({
  descripcion: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  costoUnit: {type: Number, required: true},
  rendimiento: {type: Number, required: false}, //Ingresado por le usuario
  valorUnit: {type: Number, required: false} //mirar despues
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("Transporte", TransportSchema);
