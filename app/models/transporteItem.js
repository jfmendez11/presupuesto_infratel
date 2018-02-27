/* global require */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Tranporte = require("./Transporte");

let TransportISchema = new Schema({
  descripcion: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  costoUnit: {type: Number, required: true},
  rendimiento: {type: Number, required: false}, //Ingresado por le usuario
  valorUnit: {type: Number, required: false}, //mirar despues
  transportes: [{type: Schema.Types.ObjectId, ref: "Transporte"}]
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("TransporteI", TransportISchema);
