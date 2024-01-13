/*
=IMPORTANT=
Whatever you do in this file, do it also in scraper-map.js in ./cron
=IMPORTANT=
*/

import * as CanadianPMX from "./scrapers/canadianPMX.js";
import * as BorderGold from "./scrapers/borderGold.js";

export default {
  "CanadianPMX": CanadianPMX,
  "Border Gold": BorderGold,
  // add other scrapers here
};
