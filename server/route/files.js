const files = require("../models/files");

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
		files.create({
			bookName: req.body.name,
			fileName: req.file.originalname,
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