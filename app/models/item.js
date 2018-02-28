/* global require */
const mongoose = require("mongoose");
const Proyecto = require("./proyecto");
const Schema = mongoose.Schema;

let ItemSchema = new Schema ({
  //codigo: {type: Number, required: true, index: {unique: true}},
  descripcion: {type: String, required: true, index: {unique: true}},
  unidad: {type: String, required: true},
  cantidad: {type: Number, rquired: true},
  idProyecto: {type: Schema.Types.ObjectId, ref: "Proyecto", index: {unique: true}}
});

module.exports = mongoose.model("Item", ItemSchema);
