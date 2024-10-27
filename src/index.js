const express = require("express");
const tmx = require("tmx-parser");

const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);

const io = new Server(server);

const LoadedMap = require("./mapLoader");

const tickRate = 1000;
const speed = 50;

function ticker() {
  for (const player of players) {
    const inputs = inputsMap[player.id];
    // player position UP & DOWN
    if (inputs.up) {
      player.y -= speed;
    } else if (inputs.down) {
      player.y += speed;
    }
    // player position RIGHT & LEFT
    if (inputs.right) {
      player.x += speed;
    } else if (inputs.left) {
      player.x -= speed;
    }
  }
  io.emit("players", players);
}

let players = [];
const inputsMap = {};

async function main() {
  const TwoDArray = await LoadedMap(); // This will load the map from the file and return a 2D array of the map which is exported
  io.on("connect", (socket) => {
    console.log("New user connection", socket.id);

    inputsMap[socket.id] = {
      up: false,
      down: false,
      right: false,
      left: false,
    };

    // push new players
    players.push({
      id: socket.id,
      x: 0,
      y: 0,
    });
    socket.emit("map", TwoDArray);

    socket.on("inputs", (inputs) => {
      inputsMap[socket.id] = inputs;
    });

    socket.on("disconnect", () => {
      players = players.filter((player) => player.id !== socket.id);
    });
  });
  app.use(express.static("public"));
  server.listen(3000);
  setInterval(ticker, 1000 / tickRate);
}
main();
