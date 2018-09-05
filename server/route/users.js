const users= require("../models/users");

let usersData = {

	showData(req, res){
		let userFilter = "";


		if(req.query.filter){
			let user = req.query.filter;
			userFilter = {
				FirstName: new RegExp(user.FirstName, "i"),
				LastName: new RegExp(user.LastName, "i"),
				Phone: new RegExp(user.Phone, "i"),
				Job: new RegExp(user.Job, "i"),
			};
		}

		if(req.query.sort){
			console.log("sort");
			users.find({}).sort(req.query.sort).exec(function(err, data) {
				if(err){
					console.log(err);
					res.status(500).send(err);
				} else{
					if(req.query.filter){
						users.find(userFilter).sort(req.query.sort).exec(function(err, data){
							if(err){
								console.log(err);
								res.status(500).send(err);
							} else{
								res.json(data);
							}
						});
					}
					else{
						res.json(data);
					}
				}
			});
		}
		else if(req.query.filter){

			let count = Number(req.query.count);
			let skip = Number(req.query.start);

			users.find(userFilter).skip(skip).limit(count).exec(function(err, data){
				if(err){
					console.log(err);
					res.status(500).send(err);
				}
				else{
					res.json({
						"data": data,
						"pos": req.query.start
					});
				}
			});
		} 		
		else {
			users.find({}, function(err, allData){
				if(err){
					console.log(err);
					res.status(500).send(err);
				}
				else {
					users.find({}).limit(15).exec(function(err, data){
						if(err){
							console.log(err);
							res.status(500).send(err);
						}
						else{
							res.json({
								"data": data,
								"pos": 0,
								"total_count": allData.length
							});
						}
					});
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