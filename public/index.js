const socket = io(`ws://localhost:3000`);

const mapImage = new Image();
mapImage.src = "/snowy-sheet.png";

const characterImage = new Image();
characterImage.src = "/character.png";

const tileSize = 16;
const tileInRow = 8;

socket.on("connect", () => {
  console.log("New user connection");
});

let map = [[]];
let players = [];

socket.on("map", (loadedMap) => {
  map = loadedMap;
});

socket.on("players", (onlinePlayers) => {
  players = onlinePlayers;
});

const canvasEl = document.getElementById("canvas");
const canvas = canvasEl.getContext("2d");
canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;

console.log(canvasEl);

socket.on("map", (map) => {
  console.log("map", map);
});

// key maps for the player movement
const inputs = {
  up: false,
  down: false,
  right: false,
  left: false,
};

// event listener for key press
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    inputs["up"] = true;
  } else if (e.key === "ArrowDown") {
    inputs["down"] = true;
  } else if (e.key === "ArrowRight") {
    inputs["right"] = true;
  } else if (e.key === "ArrowLeft") {
    inputs["left"] = true;
  }
  socket.emit("inputs", inputs);
});
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    inputs["up"] = false;
  } else if (e.key === "ArrowDown") {
    inputs["down"] = false;
  } else if (e.key === "ArrowRight") {
    inputs["right"] = false;
  } else if (e.key === "ArrowLeft") {
    inputs["left"] = false;
  }
  socket.emit("inputs", inputs);
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

  for (const player of players) {
    canvas.drawImage(characterImage, player.x, player.y, 100, 100);
  }

  window.requestAnimationFrame(gameloop);
}
window.requestAnimationFrame(gameloop);
