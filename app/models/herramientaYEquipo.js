/* global require */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let HyESchema = new Schema({
  descripcion: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  precio: {type: Number, required: true}
  //codigo: {type: Number, required: true, index: {unique: true}}
});
module.exports = mongoose.model("HyE", HyESchema);
