/* global require */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Material = require("./material");
const item = require("./item");

let MaterialISchema = new Schema({
  costorUnit: {type: Number, required: false},
  material: {type: Schema.Types.ObjectId, ref: "Material"},
  item: {type: Schema.type.ObjectId, ref: "Item"}
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("MaterialI", MaterialISchema);
