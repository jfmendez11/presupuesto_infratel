var mongoose = require('mongoose');
var Material = require('./Material');
var HyE = require('./HerramientaYEquipo');
var Mo = require('./ManoDeObra');
var Tranporte = require('./Transporte');
var Schema = mongoose.Schema;

var ItemSchema = new Schema ({
  codigo: {type: Number, required: true, index: {unique: true}},
  descripcion: {type: String, required: true},
  unidad: {type: String, required: true},
  cantidad: {type: Number, rquired: true},
  idProyecto: {type: Schema.Types.ObjectId, ref: 'Proyecto'},
  materiales: [{type: Schema.Types.ObjectId, ref: 'Material'}],
  herrramientasYEquipos: [{type: Schema.Types.ObjectId, ref: 'HyE'}],
  trabajadores: [{type: Schema.Types.ObjectId, ref: 'ManoObra'}],
  transportes: [{type: Schema.Types.ObjectId, ref: 'Transporte'}]
});

module.exports = mongoose.model('Item', ItemSchema);
