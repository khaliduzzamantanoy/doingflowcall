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
app.use(express.static(path.join(__dirname, "public")));

// Store active rooms and users
const rooms = new Map();
const users = new Map();

// Generate random 6-digit room code
function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Create room
  socket.on("create-room", (data) => {
    const { userName } = data;
    let roomCode;

    // Generate unique room code
    do {
      roomCode = generateRoomCode();
    } while (rooms.has(roomCode));

    // Create room
    rooms.set(roomCode, {
      host: socket.id,
      users: new Map([[socket.id, { name: userName, socketId: socket.id }]]),
      createdAt: new Date(),
    });

    users.set(socket.id, { roomCode, userName });
    socket.join(roomCode);

    socket.emit("room-created", { roomCode, userName });
    console.log(`Room ${roomCode} created by ${userName}`);
  });

  // Join room
  socket.on("join-room", (data) => {
    const { roomCode, userName } = data;

    if (!rooms.has(roomCode)) {
      socket.emit("error", { message: "Room not found" });
      return;
    }

    const room = rooms.get(roomCode);

    // Check if room is full (optional limit)
    if (room.users.size >= 10) {
      socket.emit("error", { message: "Room is full" });
      return;
    }

    // Add user to room
    room.users.set(socket.id, { name: userName, socketId: socket.id });
    users.set(socket.id, { roomCode, userName });
    socket.join(roomCode);

    // Notify user they joined successfully
    socket.emit("room-joined", { roomCode, userName });

    // Notify other users in room
    socket.to(roomCode).emit("user-joined", {
      userId: socket.id,
      userName,
      users: Array.from(room.users.values()),
    });

    // Send current users list to new user
    socket.emit("users-list", {
      users: Array.from(room.users.values()),
    });

    console.log(`${userName} joined room ${roomCode}`);
  });

  // WebRTC signaling
  socket.on("offer", (data) => {
    socket.to(data.target).emit("offer", {
      offer: data.offer,
      sender: socket.id,
    });
  });

  socket.on("answer", (data) => {
    socket.to(data.target).emit("answer", {
      answer: data.answer,
      sender: socket.id,
    });
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.target).emit("ice-candidate", {
      candidate: data.candidate,
      sender: socket.id,
    });
  });

  // Mute/unmute events
  socket.on("toggle-mute", (data) => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(user.roomCode).emit("user-mute-status", {
        userId: socket.id,
        isMuted: data.isMuted,
      });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const user = users.get(socket.id);

    if (user) {
      const { roomCode } = user;
      const room = rooms.get(roomCode);

      if (room) {
        room.users.delete(socket.id);

        // If room is empty, delete it
        if (room.users.size === 0) {
          rooms.delete(roomCode);
          console.log(`Room ${roomCode} deleted (empty)`);
        } else {
          // Notify other users
          socket.to(roomCode).emit("user-left", {
            userId: socket.id,
            users: Array.from(room.users.values()),
          });

          // If host left, assign new host
          if (room.host === socket.id) {
            const newHost = room.users.keys().next().value;
            room.host = newHost;
            socket.to(roomCode).emit("new-host", { hostId: newHost });
          }
        }
      }

      users.delete(socket.id);
    }

    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Voice chat server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
});
