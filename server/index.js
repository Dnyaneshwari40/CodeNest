const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app ka address
    methods: ["GET", "POST"]
  }
});

// Listen for client connections
io.on("connection", (socket) => {
  console.log(`🟢 New client connected: ${socket.id}`);

  // TEXT SYNC
  socket.on("text-change", (data) => {
    socket.broadcast.emit("receive-text", data);
  });

  // DRAW SYNC
  socket.on("draw", (data) => {
    socket.broadcast.emit("receive-draw", data);
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
