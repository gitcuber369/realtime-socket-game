const express = require("express");
const tmx = require("tmx-parser");

const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);

const io = new Server(server);

const LoadedMap = require("./mapLoader");

async function main() {
  const TwoDArray = await LoadedMap(); // This will load the map from the file and return a 2D array of the map which is exported
  io.on("connect", (socket) => {
    console.log("New user connection", socket.id);

    socket.emit("map", TwoDArray);
  });
  app.use(express.static("public"));
  server.listen(3000);
}
main();
