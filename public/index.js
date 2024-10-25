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

canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;

console.log(canvasEl);

socket.on("map", (map) => {
  console.log("map", map);
});

function gameloop() {
  canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);

  const rows = Math.ceil(canvasEl.height / tileSize);
  const cols = Math.ceil(canvasEl.width / tileSize);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const { id } = map[row] && map[row][col] ? map[row][col] : { id: 0 }; // Prevent undefined errors      const imageRow = parseInt(id / tileInRow);
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
