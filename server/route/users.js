const users= require("../models/users");

let usersData = {
	showData(req, res){
		if(req.query.sort){
			users.find({}).sort(req.query.sort).exec(function(err, data) {
				if(err){
					res.status(500).send(err);
				} else{
					res.json(data);
				}
			});
		}
		else if(req.query.filter && req.query.start == 0){
			let user = req.query.filter;
			let userFilter = {
				FirstName: new RegExp(user.FirstName, "i"),
				LastName: new RegExp(user.LastName, "i"),
				Phone: new RegExp(user.Phone, "i"),
				Job: new RegExp(user.Job, "i"),
			};
			users.find(userFilter, function(err, data){
				if(err){
					res.status(500).send(err);
				} else{
					res.json(data);
				}
			});
		} else {
			users.find({}, function(err, data){
				if(err){
					res.status(500).send(err);
				} else {
					if(req.query.start){
						let info = {
							data: data.slice(req.query.start,(+req.query.start)+(+req.query.count)),
							pos: req.query.start,
						};
						res.json(info);
					} else {
						res.json({
							data: data.slice(0,10),
							pos: 0,
							total_count: data.length,
						});
					}
				}
			});
		}
	},

	saveData(req, res){
		users.findByIdAndUpdate(req.body._id, req.body, function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json({});
			}
		});
	}
};

module.exports = usersData;