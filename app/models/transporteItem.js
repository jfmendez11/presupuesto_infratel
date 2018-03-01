/* global require */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tranporte = require("./transporte");
const item = require("./item");

const TransportISchema = new Schema({
  rendimiento: {type: Number, required: false}, //Ingresado por le usuario
  valorUnit: {type: Number, required: false}, //mirar despues
  transporte: {type: Schema.Types.ObjectId, ref: "Transporte"},
  item: {type: Schema.Types.ObjectId, ref: "Item"}
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("TransporteI", TransportISchema);
