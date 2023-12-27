/*
=IMPORTANT=
Whatever you do in this file, do it also in scraper-map.js in ./cron
=IMPORTANT=
*/

module.exports = {
	CanadianPMX: require("./scrapers/canadianPMX.js"),
	"Border Gold": require("./scrapers/borderGold.js"),
	//add other scrapers here
};