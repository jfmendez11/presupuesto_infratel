/* global require */
let mongoose = require("mongoose");
let Material = require("./materialItem");
let HyE = require("./herramientaYEquipoItem");
let Mo = require("./manoDeObraItem");
let Tranporte = require("./transporteItem");
let Schema = mongoose.Schema;

let ItemSchema = new Schema ({
  codigo: {type: Number, required: true, index: {unique: true}},
  descripcion: {type: String, required: true},
  unidad: {type: String, required: true},
  cantidad: {type: Number, rquired: true},
  idProyecto: {type: Schema.Types.ObjectId, ref: "ProyectoI"},
  materiales: [{type: Schema.Types.ObjectId, ref: "MaterialI"}],
  herrramientasYEquipos: [{type: Schema.Types.ObjectId, ref: "HyEI"}],
  trabajadores: [{type: Schema.Types.ObjectId, ref: "ManoObraI"}],
  transportes: [{type: Schema.Types.ObjectId, ref: "TransporteI"}]
});

module.exports = mongoose.model("Item", ItemSchema);
