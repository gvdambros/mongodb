use userData;

db.users.updateOne(
	{
		_id: ObjectId("5ce65e3e3388a55ba94cb026")
	}, 
	{
		$set: {
			name: "Gustavo"
		}, 
		$inc:{
				age: 1
		}
	}
)

// create or update
db.users.updateOne(
	{
		name: "Maria"
	},
	{
		$set: {
			age: 29,
			hobbies: [
				{
						title: "cooking",
						frequency: 3
				}
			]
		}
	},
	{
		upsert: true
	}
)

// delete field
db.users.updateOne(
	{
		name: "Maria"
	},
	{
		$unset: {
			hobbies: ""
		}
	}
)

// rename field
db.users.updateOne(
	{
		name: "Maria"
	},
	{
		$rename: {
			age: "totalAge"
		}
	}
)

// Add addicted field to users that have sport as hobbie with frequency greater than 2
db.users.updateMany(
	{
		hobbies: 
		{
			$elemMatch: 
			{
				title: "Sports",
				frequency: 
				{
					$gte: 3
				}
			}
		}
	},
	{
		$set: {
			"hobbies.$.addicted": true
		}
	}
)

// Decrease the frequency of all hobbies of users older than 30
db.users.updateMany(
	{
		"age":
			{
				$gte: 30
			}
	},
	{
		$inc: {
			"hobbies.$[].frequency": -1
		}
	}
)

// Add fiels good frequency to hobbies with frequency greater than 2
db.users.updateMany(
	{
		"hobbies.frequency": {
			$gt:2
		}
	},
	{
		$set: {
			"hobbies.$[el].goodFrequency": true
		}
	},
	{
		arrayFilters: [
			{
				"el.frequency": {
					$gt: 2
				}
				
			}
		]
	}
)

// Add hobbies to Ana
db.users.updateOne(
	{
		name: "Anna" 
	},
	{
		$push: {
			hobbies: {
				$each: [
					{
						title: "Read",
						frequency: 2
					},
					{
						title: "Study",
						frequency: 7	
					},
				]
			}
		}
	}
)
