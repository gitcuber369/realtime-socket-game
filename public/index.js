const socket = io(`ws://localhost:3000`);

const mapimage = new Image();
mapimage.src = "./snowy-sheet.png";

socket.on("connect", () => {
  console.log("New user connection");
});

socket.on("map", (map) => {
  console.log("map", map);
});