const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionNewWorld = [];

scrapeNewWorld('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1115&page=');

function scrapeNewWorld(url, pgNum = 0) {
  if (pgNum === 161) {
    const stringifiedData = JSON.stringify(collectionNewWorld);
    
    return writeFile('../../db/data/collections/new-world.js', `module.exports = ${stringifiedData}`, (error) => {
      if (error) {
        throw error;
      }
      console.log('New World Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'new world' }));
      collectionNewWorld = [...collectionNewWorld, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapeNewWorld(url, pgNum + 1));
}
