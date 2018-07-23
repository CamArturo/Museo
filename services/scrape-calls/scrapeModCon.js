const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionModCon = [];

scrapeModCon('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1231&page=');

function scrapeModCon(url, pgNum = 0) {
  if (pgNum === 43) { 
    const stringifiedData = JSON.stringify(collectionModCon);
    
    return writeFile('../../db/data/collections/mod-contemporary-art.js', `module.exports = ${stringifiedData}`, (error) => {
      if (error) {
        throw error;
      }

      console.log('Modern and Contemporary Art Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'modern and contemporary art' }));
      collectionModCon = [...collectionModCon, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapeModCon(url, pgNum + 1));
}
