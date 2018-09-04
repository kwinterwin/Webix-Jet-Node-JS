const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const books = require("./server/route/books");
const users = require("./server/route/users");
const files = require("./server/models/files");

let app = express();

let port = 3000;

mongoose.connect("mongodb://localhost/task1DB");
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get("/books", books.showData);	
app.put("/books/:id", books.saveData);
app.delete("/books/:id", books.deleteData);
app.post("/books", books.addData);

app.get("/users", users.showData);
app.put("/users/:id", users.saveData);

const fileUpload = require("express-fileupload");

app.use(fileUpload());
 
app.post("/files", function(req, res) {
	let sampleFile = req.files.upload;
	sampleFile.mv("./uploads/" + sampleFile.name, function(err) {
		if (err)
			return res.status(500).send(err);
	});

	files.create({
		fileName: req.files.upload.name,
		type:     req.files.upload.mimetype
	}, function(err){
		if(err){
			res.status(500).send(err);
		} else{
			res.json({});
		}
	});
	
});

app.listen(port);