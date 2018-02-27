/* global require */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
let Mo = require("./ManoDeObra");

var MOISchema = new Schema({
  tipoDePersona: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  costo: {type: Number, required: true},
  rendimiento: {type: Number, required: false}, //Ingresado por le usuario
  valorUnit: {type: Number, required: false}, //Mirar despues
  trabajadores: [{type: Schema.Types.ObjectId, ref: "ManoObra"}]
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("ManoObraI", MOISchema);
