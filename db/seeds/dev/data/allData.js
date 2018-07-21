const {callNightmare} = require("../../../../services/scraper.js");

let collection = [];

//textile art, 10 pages

const url = "https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1178&page=";

function scrape (url, pgNum = 0) {
  if (pgNum === 10) { //number of pages
    console.log(collection.length);
    console.log(collection);
    return;
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, {category: "textile art"})); //hard coded category value
      collection = [...collection, ...result];
    })
    .catch(error => console.log("OOPS", error))
    .then(() => scrape(url, pgNum + 1));
}

scrape(url)

module.exports = collection;
// node filename