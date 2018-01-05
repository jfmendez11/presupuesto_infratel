var mongoose = requiere('mongoose');
var Item = requiere('./Item');
var Schema = mongoose.Schema;

var ProyectoSchema = new Schema({
  id: {type: Number, required: true, index: {unique: true}},
  nombre: {type: String, required: true},
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
