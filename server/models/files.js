const mongoose  = require("mongoose");

var filesSchema = new mongoose.Schema({
	bookName: String,
	fileName: String,
	path:     String,
	type:     String,
	date:     {type: Date, default: Date.now}
});

module.exports = mongoose.model("files", filesSchema);