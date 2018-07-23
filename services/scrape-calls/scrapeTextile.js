const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionTextile = [];

scrapeTextile('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1178&page=');

function scrapeTextile(url, pgNum = 0) {
  if (pgNum === 10) {
    const stringifiedData = JSON.stringify(collectionTextile);
    
    return writeFile('../../db/data/collections/textile-art.js', `module.exports = ${stringifiedData}`, (error) => {
      if (error) {
        throw error;
      }
      console.log('Textile Art Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'textile art' }));
      collectionTextile = [...collectionTextile, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapeTextile(url, pgNum + 1));
}
