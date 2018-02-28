/* global require */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransportSchema = new Schema({
  descripcion: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  costoUnit: {type: Number, required: true},
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("Transporte", TransportSchema);
