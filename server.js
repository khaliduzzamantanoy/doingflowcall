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

// Generate 6-digit room code
function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Clean up empty rooms
function cleanupRooms() {
  for (const [roomCode, room] of rooms.entries()) {
    if (room.users.size === 0) {
      rooms.delete(roomCode);
    }
  }
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Create room
  socket.on("create-room", (data) => {
    const { userName } = data;
    const roomCode = generateRoomCode();

    // Ensure unique room code
    while (rooms.has(roomCode)) {
      roomCode = generateRoomCode();
    }

    const room = {
      code: roomCode,
      creator: socket.id,
      users: new Map(),
      createdAt: new Date(),
    };

    rooms.set(roomCode, room);
    users.set(socket.id, {
      name: userName,
      roomCode: roomCode,
      socketId: socket.id,
    });

    socket.join(roomCode);
    room.users.set(socket.id, {
      name: userName,
      socketId: socket.id,
      isCreator: true,
    });

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

    users.set(socket.id, {
      name: userName,
      roomCode: roomCode,
      socketId: socket.id,
    });

    socket.join(roomCode);
    room.users.set(socket.id, {
      name: userName,
      socketId: socket.id,
      isCreator: false,
    });

    // Notify all users in room
    const userList = Array.from(room.users.values()).map((user) => ({
      name: user.name,
      socketId: user.socketId,
      isCreator: user.isCreator,
    }));

    socket.emit("room-joined", { roomCode, userName, users: userList });
    socket.to(roomCode).emit("user-joined", {
      userName,
      socketId: socket.id,
      users: userList,
    });

    console.log(`${userName} joined room ${roomCode}`);
  });

  // WebRTC signaling
  socket.on("offer", (data) => {
    const { targetSocketId, offer } = data;
    socket.to(targetSocketId).emit("offer", {
      offer,
      senderSocketId: socket.id,
    });
  });

  socket.on("answer", (data) => {
    const { targetSocketId, answer } = data;
    socket.to(targetSocketId).emit("answer", {
      answer,
      senderSocketId: socket.id,
    });
  });

  socket.on("ice-candidate", (data) => {
    const { targetSocketId, candidate } = data;
    socket.to(targetSocketId).emit("ice-candidate", {
      candidate,
      senderSocketId: socket.id,
    });
  });

  // Get room users
  socket.on("get-room-users", (roomCode) => {
    const room = rooms.get(roomCode);
    if (room) {
      const userList = Array.from(room.users.values()).map((user) => ({
        name: user.name,
        socketId: user.socketId,
        isCreator: user.isCreator,
      }));
      socket.emit("room-users", userList);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    const user = users.get(socket.id);
    if (user) {
      const room = rooms.get(user.roomCode);
      if (room) {
        room.users.delete(socket.id);

        // Notify others in room
        const userList = Array.from(room.users.values()).map((u) => ({
          name: u.name,
          socketId: u.socketId,
          isCreator: u.isCreator,
        }));

        socket.to(user.roomCode).emit("user-left", {
          userName: user.name,
          socketId: socket.id,
          users: userList,
        });
      }
      users.delete(socket.id);
    }

    cleanupRooms();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Voice chat server running on port ${PORT}`);
  console.log(`Access your app at: http://localhost:${PORT}`);
});
