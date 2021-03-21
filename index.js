// Give some mtrics of the executed code 
db.people.explain("executionStats").find({"dob.age": {$gt: 60}})

// Simple index
db.people.createIndex({"dob.age": 1})

// Delete index
db.people.dropIndex({"dob.age": 1})

// Compound index
db.people.createIndex({"dob.age": 1, gender: 1})

// Compound index
db.people.dropIndex({"dob.age": 1, gender: 1})

// Using index to create a unique field
db.people.createIndex({email: 1}, {unique: true})

// Create a partial index
db.people.createIndex({"dob.age": 1}, {partialFilterExpression: {gender: "male"}})

// Using index to create a unique field that accepts multiple documents with null email
db.people.createIndex({email: 1}, {unique: true, partialFilterExpression: {email: {$exists: true}}})

db.products.insertMany([{title: "Book", description: "awesome book about me"}, {title: "T-shirt", description: "An awesome t-shirt"}])

// Text index
db.products.createIndex({description: "text"})

// Using text index. Obs.: one document can have only one text index
db.products.find({$text: {$search: "book"}})
