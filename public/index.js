const socket = io(`ws://localhost:3000`);

const mapImage = new Image();

mapImage.src = "/snowy-sheet.png";
const tileSize = 16;
const tileInRow = 8;

socket.on("connect", () => {
  console.log("New user connection");
});

let map = [];

socket.on("map", (loadedMap) => {
  map = loadedMap;
});

const canvasEl = document.getElementById("canvas");
const canvas = canvasEl.getContext("2d");
console.log(canvasEl);

socket.on("map", (map) => {
  console.log("map", map);
});

function gameloop() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      const { id } = map[row][col];
      const imageRow = parseInt(id / tileInRow);
      const imageCol = id % tileInRow;

      canvas.drawImage(
        mapImage,
        imageCol * tileSize,
        imageRow * tileSize,
        tileSize,
        tileSize,
        col * tileSize,
        row * tileSize,
        tileSize,
        tileSize
      );
    }
  }

  window.requestAnimationFrame(gameloop);
}

window.requestAnimationFrame(gameloop);
