const archDesignGraphics = require('./collections/arch-design-graphics');
const asian = require('./collections/asian');
const modConArt = require('./collections/mod-contemporary-art');
const nativeArts = require('./collections/native-arts');
const newWorld = require('./collections/new-world');
const paintSculpt = require('./collections/paint-sculpt');
const petrieInst = require('./collections/petrie-inst');
const photog = require('./collections/photog');
const textile = require('./collections/textile-art');

module.exports = [
  ...archDesignGraphics, 
  ...asian, 
  ...modConArt, 
  ...nativeArts, 
  ...newWorld, 
  ...paintSculpt, 
  ...petrieInst, 
  ...photog, 
  ...textile
];