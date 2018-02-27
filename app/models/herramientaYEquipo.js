/* global require */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HyESchema = new Schema({
  descripcion: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  precio: {type: Number, required: true},
  rendimiento: {type: Number, required: false}, //Ingresado por le usuario
  valorUnit: {type: Number, required: false} //mirar despues
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("HyE", HyESchema);
