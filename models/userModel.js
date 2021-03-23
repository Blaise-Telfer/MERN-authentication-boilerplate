const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	username: {
	  type: String,
	  required: true,
	  unique: true
	},
	email: {
	  type: String,
	  required: true,
	  unique: true
	},
	password: {
	  type: String,
	  required: true
	},
	role: {
	  type: String,
	  default: "user"
	},
	verified: {
	  type: Boolean,
	  default: false
	},
	verifyToken: {
	  token: String,
	  expires: Date
	},
	resetToken: {
	  token: String,
	  expires: Date
	},
	date: {
	  type: Date,
	  default: Date.now
	}
});

module.exports = mongoose.model("User", UserSchema);