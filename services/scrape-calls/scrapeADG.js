const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionADG = [];

scrapeADG('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1301&page=');

function scrapeADG(url, pgNum = 0) {
  if (pgNum === 41) {
    const stringifiedData = JSON.stringify(collectionADG);
    
    return writeFile('../../db/data/collections/arch-design-graphics.js', `module.exports = ${stringifiedData}`, (error) => {
      if (error) {
        throw error;
      }
      console.log('Architecture Design and Graphics Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'architecture design and graphics' }));
      collectionADG = [...collectionADG, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapeADG(url, pgNum + 1));
}
