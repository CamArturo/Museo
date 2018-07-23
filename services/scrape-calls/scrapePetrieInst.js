const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionPetrieInst = [];

scrapePetrieInst('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1061&page=');

function scrapePetrieInst(url, pgNum = 0) {
  if (pgNum === 41) { 
    const stringifiedData = JSON.stringify(collectionPetrieInst);
    
    return writeFile('../../db/data/collections/petrie-inst.js', `module.exports = ${stringifiedData}`, (error) => {
      if (error) {
        throw error;
      }
      console.log('Petrie Inst Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'petrie institute' }));
      collectionPetrieInst = [...collectionPetrieInst, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapePetrieInst(url, pgNum + 1));
}
