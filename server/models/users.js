const mongoose  = require("mongoose");

let usersSchema = new mongoose.Schema({
	FirstName: String,
	LastName: String,
	Phone: String,
	Job: String
});

module.exports = mongoose.model("users", usersSchema);