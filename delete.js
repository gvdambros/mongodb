use userData;

// delete Max user
db.users.deleteOne(
	{
		name: "Max"
	}
)

// delete all users that have sport as hobbie
db.users.deleteMany(
	{
		hobbies:	
		{		
			$elemMatch: 
			{
				title: "Sports"
			}	
		}			
	}
) 

// Delete all users
db.users.deleteMany({}) 