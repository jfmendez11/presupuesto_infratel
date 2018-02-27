/* global require */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MOSchema = new Schema({
  tipoDePersona: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  costo: {type: Number, required: true},
  rendimiento: {type: Number, required: false}, //Ingresado por le usuario
  valorUnit: {type: Number, required: false} //Mirar despues
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("ManoObra", MOSchema);
