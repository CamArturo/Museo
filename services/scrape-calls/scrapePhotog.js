const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionPhotog = [];

scrapePhotog('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1121&page=');

function scrapePhotog(url, pgNum = 0) {
  if (pgNum === 85) {
    const stringifiedData = JSON.stringify(collectionPhotog);
    
    return writeFile('../../db/data/collections/photog.js', `module.exports = ${stringifiedData}`, (error) => {
      if (error) {
        throw error;
      }
      console.log('Photog Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'photography' }));
      collectionPhotog = [...collectionPhotog, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapePhotog(url, pgNum + 1));
}
