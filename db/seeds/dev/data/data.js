// const usersData = [{
//   name: "Brittany",
//   email: "brit@ail.com",
//   comments: ["this is art?", "nice!"]
//
// },
//   {
//     author: "Robbie",
//     email: "robb@gogo.com",
//     comments: ["uh, yeah", "that is very square"]
//   }];
//
// const collectionsData = [{
//   title: "blip",
//   artist: "bloop",
//   year: "1999",
//   category: "muhrkin",
//   page_link: "http://hereitis",
//   image_link: "http://lookatit",
//   comments: ["this is art?", "that is very square"]
// },
//   {
//     title: "goo",
//     artist: "graah",
//     year: "1989",
//     category: "alien",
//     page_link: "http://ssskeke",
//     image_link: "http://rrrlsls",
//     comments: ["uh, yeah", "nice!"]
//   }];

const {callNightmare} = require("../../../../services/scraper");

let collection = [];

//textile art, 10 pages

const url = "https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1178&page=";

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

scrape(url);
// node filename

module.exports = {usersData, collectionsData};