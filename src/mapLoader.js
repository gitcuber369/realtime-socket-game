const tmx = require("tmx-parser");

// This function will load the map from the file and return a 2D array of the map
// promise is used cause the map is loaded asynchronously
async function loadedMap() {
  const map = await new Promise((resolve, reject) => {
    tmx.parseFile("./src/map.tmx", function (err, loadedMap) {
      if (err) return reject(err);
      resolve(loadedMap);
    });
  });

  const layers = map.layers[0];
  const tiles = layers.tiles;
  const TwoDArray = [];
  //   for 2D array for the map as it is a single array right now
  for (let row = 0; row < map.height; row++) {
    const tileRow = [];
    for (let col = 0; col < map.width; col++) {
      const tile = tiles[row * map.height + col];
      console.log(tile);
      tileRow.push({ id: tile.id, gid: tile.gid });
    }
    TwoDArray.push(tileRow);
  }

  return TwoDArray;
}

module.exports = loadedMap;
