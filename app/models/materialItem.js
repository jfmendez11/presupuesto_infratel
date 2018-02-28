/* global require */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Material = require("./material");
const item = require("./Item");

const MaterialISchema = new Schema({
  costorUnit: {type: Number, required: false},
  material: {type: Schema.Types.ObjectId, ref: "Material"},
  item: {type: Schema.Types.ObjectId, ref: "Item"}
  //codigo: {type: Number, required: true, index: {unique: true}}
});

module.exports = mongoose.model("MaterialI", MaterialISchema);
