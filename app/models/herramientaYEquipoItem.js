/* global require */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let HyE = require("./HerramientaYEquipo");

let HyEISchema = new Schema({
  descripcion: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  precio: {type: Number, required: true},
  rendimiento: {type: Number, required: false},
  valorUnit: {type: Number, required: false},
  herrramientasYEquipos: {type: Schema.Types.ObjectId, ref: "HyE"}
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("HyEI", HyEISchema);
