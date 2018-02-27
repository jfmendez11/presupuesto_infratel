/* global require */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MaterialSchema = new Schema({
  descripcion: {type: String, required: true, index: {unique: true }},
  unidad: {type: String, required: true},
  valorUnitMat: {type: Number, required: true}
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("Material", MaterialSchema);
