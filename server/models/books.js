const mongoose  = require("mongoose");

let booksSchema = new mongoose.Schema({
	Name: String,
	Year: Number,
	Author: String,
	Category: Number,
	Description: String
});

module.exports = mongoose.model("books", booksSchema); 