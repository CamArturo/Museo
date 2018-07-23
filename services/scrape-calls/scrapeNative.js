const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionNative = [];

scrapeNative('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1073&page=');

function scrapeNative(url, pgNum = 0) {
  if (pgNum === 38) {
    const stringifiedData = JSON.stringify(collectionNative);
    
    return writeFile('../../db/data/collections/native-arts.js', `module.exports = ${stringifiedData}`, (error) => {
     if (error) {
        throw error;
      }

     console.log('Native Arts Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'native arts' }));
      collectionNative = [...collectionNative, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapeNative(url, pgNum + 1));
}
