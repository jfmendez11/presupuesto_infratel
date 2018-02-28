/* global require */
const mongoose = require("mongoose");
const Item = require("./Item");
const Schema = mongoose.Schema;

let ProyectoSchema = new Schema({
  //id: {type: Number, required: true, index: {unique: true}},
  nombre: {type: String, required: true, index: {unique: true}}
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
