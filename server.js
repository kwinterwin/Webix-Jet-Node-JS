const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const books = require("./server/route/books");
const users = require("./server/route/users");
const files = require("./server/route/files");

let app = express();

let port = 3000;

mongoose.connect("mongodb://localhost/task1DB");
app.use(bodyParser.urlencoded({extended: true}));

app.use("/uploads", express.static("uploads"));

app.use(cors());

app.get("/books", books.showData);	
app.put("/books/:id", books.saveData);
app.delete("/books/:id", books.deleteData);
app.post("/books", books.addData);

app.get("/users", users.showData);
app.put("/users/:id", users.saveData);

const multer = require("multer");
		
let storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, "./uploads/");
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString());
	}
});

let upload = multer({storage: storage});
app.get("/files", files.showData);
app.post("/files", upload.single("upload"), files.addData); 

app.listen(port, function(){
	console.log("Started!");
});