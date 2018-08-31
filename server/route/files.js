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
		console.log(req);
		console.log(req.body);
		console.log(req.file);
		files.create({
			filmName: req.body.name,
			realName: req.file.originalname,
			path:     req.file.path,
			type:     req.file.mimetype
		}, function(err, newFilm){
			if(err){
				console.log("ERROR!");
			} else{
				res.json({});
			}
		});
	}
};	

module.exports = filesData;