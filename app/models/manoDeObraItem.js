/* global require */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Mo = require("./manoDeObra");
const item = require("./item");

const MOISchema = new Schema({
  rendimiento: {type: Number, required: false}, //Ingresado por le usuario
  valorUnit: {type: Number, required: false}, //Mirar despues
  trabajador: {type: Schema.Types.ObjectId, ref: "ManoObra"},
  item: {type: Schema.Types.ObjectId, ref: "Item"}
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("ManoObraI", MOISchema);
