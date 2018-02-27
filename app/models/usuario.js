var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var UsuarioSchema = new Schema({
  email: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true, select: false }
});

UsuarioSchema.pre("save", function(next){
	var user = this;
	if (!user.isModified("password")) return next();
	bcrypt.hash(user.password, null, null, function(err, hash){
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

UsuarioSchema.methods.comparePassword = function(password){
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
