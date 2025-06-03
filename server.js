const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Serve static files
app.use(express.static("public"));

// Store active rooms and users
const rooms = new Map();
const users = new Map();

// Generate random 6-digit room codes
function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// WebRTC signaling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  socket.on("join-room", (data) => {
    try {
      const { roomCode, username } = data;

      console.log(`${username} attempting to join room ${roomCode}`);

      if (!rooms.has(roomCode)) {
        rooms.set(roomCode, new Set());
      }

      const room = rooms.get(roomCode);
      room.add(socket.id);

      users.set(socket.id, { username, roomCode });
      socket.join(roomCode);

      console.log(`${username} joined room ${roomCode}`);

      // Notify others in the room
      socket.to(roomCode).emit("user-joined", {
        userId: socket.id,
        username: username,
      });

      // Send existing users to the new user
      const existingUsers = Array.from(room)
        .filter((id) => id !== socket.id)
        .map((id) => ({
          userId: id,
          username: users.get(id)?.username || "Unknown",
        }));

      socket.emit("existing-users", existingUsers);
      socket.emit("room-joined", { roomCode, userCount: room.size });
    } catch (error) {
      console.error("Error joining room:", error);
      socket.emit("error", { message: "Failed to join room" });
    }
  });

  // Create new room
  socket.on("create-room", (data) => {
    try {
      const { username } = data;
      const roomCode = generateRoomCode();

      console.log(`Creating room for ${username}, code: ${roomCode}`);

      rooms.set(roomCode, new Set([socket.id]));
      users.set(socket.id, { username, roomCode });
      socket.join(roomCode);

      console.log(`${username} created room ${roomCode}`);
      socket.emit("room-created", { roomCode });
    } catch (error) {
      console.error("Error creating room:", error);
      socket.emit("error", { message: "Failed to create room" });
    }
  });

  // WebRTC signaling
  socket.on("offer", (data) => {
    socket.to(data.target).emit("offer", {
      offer: data.offer,
      caller: socket.id,
    });
  });

  socket.on("answer", (data) => {
    socket.to(data.target).emit("answer", {
      answer: data.answer,
      answerer: socket.id,
    });
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.target).emit("ice-candidate", {
      candidate: data.candidate,
      sender: socket.id,
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const user = users.get(socket.id);
    if (user) {
      const { roomCode, username } = user;
      const room = rooms.get(roomCode);

      if (room) {
        room.delete(socket.id);

        // Clean up empty rooms
        if (room.size === 0) {
          rooms.delete(roomCode);
        } else {
          // Notify others that user left
          socket.to(roomCode).emit("user-left", {
            userId: socket.id,
            username: username,
          });
        }
      }

      users.delete(socket.id);
      console.log(`${username} left room ${roomCode}`);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Voice chat server running on port ${PORT}`);
  console.log(`Access at: http://localhost:${PORT}`);
});
