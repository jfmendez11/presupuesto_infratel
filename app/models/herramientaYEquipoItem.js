/* global require */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HyE = require("./herramientaYEquipo");
const item = require("./item");

const HyEISchema = new Schema({
  rendimiento: {type: Number, required: false},
  valorUnit: {type: Number, required: false},
  herrramientasYEquipos: {type: Schema.Types.ObjectId, ref: "HyE"},
  item: {type: Schema.Types.ObjectId, ref: "Item"}
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("HyEI", HyEISchema);
