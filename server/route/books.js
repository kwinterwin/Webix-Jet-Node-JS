const books = require ("../models/books");

let booksData = {

	saveData(req, res){
		books.findByIdAndUpdate(req.body._id, req.body, function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json({});
			}
		});
	},

	showData(req, res){
		books.find({}, function(err, data){
			if(err){
				res.status(500).send(err);
			} else{
				res.json(data);
			}
		});
	},

	deleteData(req, res){
		books.findByIdAndRemove(req.body._id, function(err){
			if(err){
				res.status(500).send(err);
			} else{
				res.json({});
			}
		});
	},

	addData(req, res){
		books.create(req.body, function(err){
			if(err){
				res.status(500).send(err);
			} else{
				res.json({});
			}
		});
	}	
};
module.exports = booksData;