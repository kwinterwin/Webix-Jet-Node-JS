const files = require("../models/files"),
	multer = require("multer");
		
// let storage = multer.diskStorage({
// 	destination: function(req, file, cb){
// 		cb(null, "./uploads/");
// 	},
// 	filename: function(req, file, cb){
// 		cb(null, new Date().toISOString());
// 	}
// });

// let upload = multer({storage: storage});
let filesData = {
	showData(req, res){
		files.find({}, function(err, data){
			if(err){
				console.log("ERROR!");
			} else{
				res.json(data);
			}
		});
	},

	addData(req, res){
		console.log(req);
		files.create({
			path:     req.file.path,
			type:     req.file.mimetype
		}, function(err){
			if(err){
				console.log("ERROR!");
			} else{
				res.json({});
			}
		});
	}
};	

module.exports = filesData;