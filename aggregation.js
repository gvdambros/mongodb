use personData

// Sort the states with more women
db.people.aggregate([
	{
		$match: {gender: "female"}
	},
	{
		$group: {_id: {state: "$location.state"}, totalPeople: {$sum: 1}}
	},
	{
		$sort: {
			totalPeople: -1
		}
	}
]).pretty()

// Sort the years with more people
db.people.aggregate([
	{	
		$project: {
			_id: 1,
			location: {
				type: "Point",
				coordinates: [
					{ $toDouble: "$location.coordinates.longitude"} ,
					{ $toDouble: "$location.coordinates.latitude"}
				]
			},
			birthdate: {$toDate: "$dob.date"} 
		}
	},
	{
		$group: {
			_id: {birthYear: {$isoWeekYear: "$birthdate"}}, numPeople: {$sum: 1}
		}
	},
	{
		$sort: {
			numPeople: -1
		}
	}
]).pretty()

// Create buckets of 10 years
db.people.aggregate([
	{	
		$bucket: {
			groupBy: "$dob.age",
			boundaries: [20, 30, 40, 50, 60, 70, 80],
			output: {
				numPeople: {$sum: 1},
				averageAge: {$avg: "$dob.age"}
			}
		}
	}
]).pretty()

// Create 5 buckets automatically
db.people.aggregate([
	{	
		$bucketAuto: {
			groupBy: "$dob.age",
			buckets: 5,
			output: {
				numPeople: {$sum: 1},
				averageAge: {$avg: "$dob.age"}
			}
		}
	}
]).pretty()

// Get the 10 older men
db.people.aggregate([
	{
		$match: {gender: "male"}
	},
	{
		$project: {_id: 0, name: {$concat: ["$name.first", " ", "$name.last"]}, birthdate: {$toDate: "$dob.date"}}
	}, 
	{
		$sort: { birthdate: 1}
	},
	{ 
		$limit: 10
	},
	{
		$out: "olderMen"
	}
]).pretty()