var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

/* GET home page. */
router.get("/hello", function (req, res, next) {
	console.log("Saying hello");
	const { name } = req.query;
	res.send(`<h1>Hello ${name || "world"}</h1>`);
});

router.get("/users", async (req, res) => {
	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const usersCollection = db.collection("users");
	const users = await usersCollection.find().toArray();

	res.send(users);
});

module.exports = router;
