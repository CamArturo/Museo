const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionAsian = [];

scrapeAsian('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1094&page=');

function scrapeAsian(url, pgNum = 0) {
  if (pgNum === 11) {
    const stringifiedData = JSON.stringify(collectionAsian);
    
    return writeFile('../../db/data/collections/asian.js', `module.exports = ${stringifiedData}`, (error) => {
      if (error) {
        throw error;
      }
      console.log('Asian Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'asian' }));
      collectionAsian = [...collectionAsian, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapeAsian(url, pgNum + 1));
}

