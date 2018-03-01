/* global require */
const mongoose = require("mongoose");
const Item = require("./item");
const Schema = mongoose.Schema;

const ProyectoSchema = new Schema({
  //id: {type: Number, required: true, index: {unique: true}},
  nombre: {type: String, required: true, index: {unique: true}}
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
