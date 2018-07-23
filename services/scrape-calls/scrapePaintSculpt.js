const callNightmare = require('../scraper');
const { writeFile } = require('fs');

let collectionPaintSculpt = [];

scrapePaintSculpt('https://denverartmuseum.org/collection?f%5B0%5D=field_co_department_term%3A1068&page=');

function scrapePaintSculpt(url, pgNum = 0) {
  if (pgNum === 21) { 
    const stringifiedData = JSON.stringify(collectionPaintSculpt);
    
    return writeFile('../../db/data/collections/paint-sculpt.js', `module.exports = ${stringifiedData}`, (error) => {
      if (error) {
        throw error;
      }

      console.log('Painting and Sculpting Collection saved');
    });
  }

  callNightmare(url + pgNum)
    .then(result => {
      result = result.map(artInfo => Object.assign(artInfo, { category: 'painting and sculpting' }));
      collectionPaintSculpt = [...collectionPaintSculpt, ...result];
    })
    .catch(error => console.log('OOPS', error))
    .then(() => scrapePaintSculpt(url, pgNum + 1));
}
