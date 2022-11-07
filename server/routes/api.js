var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/hello", function (req, res, next) {
	console.log("Saying hello");
	const { name } = req.query;
	res.send(`<h1>Hello ${name || "world"}</h1>`);
});

module.exports = router;
