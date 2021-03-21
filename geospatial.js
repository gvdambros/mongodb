use placeData

db.places.insertOne({name: "Statue of Liberty National Monument", location: {type: "Point", coordinates: [-74.045527, 40.689243]}})
db.places.insertOne({name: "World Trade Center", location: {type: "Point", coordinates: [-74.013158, 40.712836]}})
db.places.insertOne({name: "Empire State Building", location: {type: "Point", coordinates: [-73.985655, 40.748428]}})
db.places.insertOne({name: "Manhattan Bridge", location: {type: "Point", coordinates: [-73.990466, 40.706980]}})

// Create index to geospatial finds
db.places.createIndex({location: "2dsphere"})

// Find places that are 5 km from a point
db.places.find({location: {$near: {$geometry: {type: "Point", coordinates: [ -74.013158, 40.712836]}, $maxDistance: 5000}}}).pretty()

const p1 = [-74.05513, 40.65263]
const p2 = [-73.99608, 40.78508]
const p3 = [-73.92707, 40.7661]
const p4 = [-73.98441, 40.63648]

// Find places that are inside a polygon
db.places.find({location: {$geoWithin: {$geometry: {type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]]}}}}).pretty()

db.areas.insertOne({name: "New York", area: {type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]]}})

// Create index to geospatial finds
db.areas.createIndex({area: "2dsphere"})

// Find polygons that have a point
db.areas.find({area: {$geoIntersects: {$geometry: {type: "Point", coordinates: [ -74.013158, 40.712836]}}}}).pretty()