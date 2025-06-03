<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Voice Chat Room</title>
    <script src="/socket.io/socket.io.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .container {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 90%;
        text-align: center;
      }

      .logo {
        font-size: 2.5em;
        color: #667eea;
        margin-bottom: 10px;
        font-weight: bold;
      }

      .subtitle {
        color: #666;
        margin-bottom: 30px;
        font-size: 1.1em;
      }

      .input-group {
        margin-bottom: 20px;
        text-align: left;
      }

      .input-group label {
        display: block;
        margin-bottom: 8px;
        color: #333;
        font-weight: 500;
      }

      .input-group input {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e1e5e9;
        border-radius: 10px;
        font-size: 16px;
        transition: border-color 0.3s;
      }

      .input-group input:focus {
        outline: none;
        border-color: #667eea;
      }

      .button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        margin: 10px;
        transition: transform 0.2s, box-shadow 0.2s;
        font-weight: 500;
      }

      .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      }

      .button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      .room-info {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
      }

      .room-code {
        font-size: 2em;
        font-weight: bold;
        color: #667eea;
        letter-spacing: 3px;
        margin: 10px 0;
      }

      .users-list {
        margin-top: 20px;
      }

      .user-item {
        background: white;
        padding: 10px 15px;
        margin: 5px 0;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .user-name {
        font-weight: 500;
        color: #333;
      }

      .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #4caf50;
      }

      .status-indicator.muted {
        background: #f44336;
      }

      .controls {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 15px;
      }

      .mute-button {
        background: #4caf50;
      }

      .mute-button.muted {
        background: #f44336;
      }

      .error {
        color: #f44336;
        background: #ffebee;
        padding: 10px;
        border-radius: 8px;
        margin: 10px 0;
      }

      .success {
        color: #4caf50;
        background: #e8f5e8;
        padding: 10px;
        border-radius: 8px;
        margin: 10px 0;
      }

      .hidden {
        display: none !important;
      }

      .divider {
        margin: 30px 0;
        position: relative;
        text-align: center;
      }

      .divider::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: #e1e5e9;
      }

      .divider span {
        background: rgba(255, 255, 255, 0.95);
        padding: 0 20px;
        color: #666;
        font-weight: 500;
      }

      @media (max-width: 600px) {
        .container {
          margin: 20px;
          padding: 20px;
        }

        .logo {
          font-size: 2em;
        }

        .controls {
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Welcome Screen -->
      <div id="welcomeScreen">
        <div class="logo">🎙️ Voice Chat</div>
        <div class="subtitle">Connect with anyone, anywhere</div>

        <div class="input-group">
          <label for="userName">Your Name</label>
          <input
            type="text"
            id="userName"
            placeholder="Enter your name"
            maxlength="20"
          />
        </div>

        <button class="button" onclick="createRoom()">Create Room</button>

        <div class="divider">
          <span>OR</span>
        </div>

        <div class="input-group">
          <label for="roomCode">Room Code</label>
          <input
            type="text"
            id="roomCode"
            placeholder="Enter 6-digit room code"
            maxlength="6"
          />
        </div>

        <button class="button" onclick="joinRoom()">Join Room</button>

        <div id="errorMessage" class="error hidden"></div>
      </div>

      <!-- Room Screen -->
      <div id="roomScreen" class="hidden">
        <div class="logo">🎙️ Voice Chat</div>

        <div class="room-info">
          <div>Room Code</div>
          <div class="room-code" id="currentRoomCode">------</div>
          <div>Share this code with others to join</div>
        </div>

        <div class="controls">
          <button
            class="button mute-button"
            id="muteButton"
            onclick="toggleMute()"
          >
            🎤 Unmuted
          </button>
          <button
            class="button"
            onclick="leaveRoom()"
            style="background: #f44336"
          >
            📞 Leave
          </button>
        </div>

        <div class="users-list">
          <h3 style="margin-bottom: 15px; color: #333">Connected Users</h3>
          <div id="usersList"></div>
        </div>

        <div id="statusMessage" class="success hidden"></div>
      </div>
    </div>

    <script>
      // Global variables
      let socket;
      let localStream;
      let peerConnections = new Map();
      let currentRoom = null;
      let currentUser = null;
      let isMuted = false;
      let isInRoom = false;

      // WebRTC configuration
      const rtcConfig = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },
          { urls: "stun:stun.ekiga.net" },
          { urls: "stun:stun.ideasip.com" },
          { urls: "stun:stun.rixtelecom.se" },
          { urls: "stun:stun.schlund.de" },
          { urls: "stun:stun.stunprotocol.org:3478" },
          { urls: "stun:stun.voiparound.com" },
          { urls: "stun:stun.voipbuster.com" },
          { urls: "stun:stun.voipstunt.com" },
          { urls: "stun:stun.voxgratia.org" },
          { urls: "stun:stun.services.mozilla.com" },
          { urls: "stun:stun.counterpath.com" },
          { urls: "stun:stun.callwithus.com" },
          { urls: "stun:stun.fwdnet.net" },
          { urls: "stun:stun.iptel.org" },
          { urls: "stun:stun.netappel.com" },
          { urls: "stun:stun.noc.ams-ix.net" },
          { urls: "stun:stun.phonepower.com" },
          { urls: "stun:stun.voip.aebc.com" },
          { urls: "stun:stun.ucallweconn.net" },
          { urls: "stun:stun.gmx.net" },
          { urls: "stun:stun.sipgate.net" },
          { urls: "stun:stun.voicetrading.com" },
          { urls: "stun:stun.acrobits.cz" },
          { urls: "stun:stun.linphone.org" },
          { urls: "stun:stun.stunprotocol.org" },
          { urls: "stun:stun.softjoys.com" },
          { urls: "stun:stun.1und1.de" },
          { urls: "stun:stun.myvoiptraffic.com" },
          { urls: "stun:stun.2talk.co.nz" },
          { urls: "stun:stun.2talk.com" },
          { urls: "stun:stun.sip.us" },
          { urls: "stun:stun.mit.de" },
          { urls: "stun:stun.cheapnet.it" },
        ],
      };

      // Initialize socket connection
      function initSocket() {
        socket = io();

        socket.on("connect", () => {
          console.log("Connected to server");
        });

        socket.on("room-created", (data) => {
          currentRoom = data.roomCode;
          currentUser = data.userName;
          showRoom(data.roomCode);
          startVoiceChat();
        });

        socket.on("room-joined", (data) => {
          currentRoom = data.roomCode;
          currentUser = data.userName;
          showRoom(data.roomCode);
          startVoiceChat();
        });

        socket.on("users-list", (data) => {
          updateUsersList(data.users);
        });

        socket.on("user-joined", (data) => {
          showStatus(`${data.userName} joined the room`);
          updateUsersList(data.users);
          // Create peer connection for new user
          if (localStream) {
            createPeerConnection(data.userId);
          }
        });

        socket.on("user-left", (data) => {
          showStatus(`User left the room`);
          updateUsersList(data.users);
          // Clean up peer connection
          if (peerConnections.has(data.userId)) {
            peerConnections.get(data.userId).close();
            peerConnections.delete(data.userId);
          }
        });

        socket.on("offer", async (data) => {
          await handleOffer(data.offer, data.sender);
        });

        socket.on("answer", async (data) => {
          await handleAnswer(data.answer, data.sender);
        });

        socket.on("ice-candidate", async (data) => {
          await handleIceCandidate(data.candidate, data.sender);
        });

        socket.on("user-mute-status", (data) => {
          updateUserMuteStatus(data.userId, data.isMuted);
        });

        socket.on("error", (data) => {
          showError(data.message);
        });
      }

      // Create room
      function createRoom() {
        const userName = document.getElementById("userName").value.trim();
        if (!userName) {
          showError("Please enter your name");
          return;
        }

        socket.emit("create-room", { userName });
      }

      // Join room
      function joinRoom() {
        const userName = document.getElementById("userName").value.trim();
        const roomCode = document.getElementById("roomCode").value.trim();

        if (!userName) {
          showError("Please enter your name");
          return;
        }

        if (!roomCode || roomCode.length !== 6) {
          showError("Please enter a valid 6-digit room code");
          return;
        }

        socket.emit("join-room", { roomCode, userName });
      }

      // Start voice chat
      async function startVoiceChat() {
        try {
          localStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              sampleRate: 48000,
            },
          });

          isInRoom = true;
          console.log("Audio stream started");
        } catch (error) {
          console.error("Error accessing microphone:", error);
          showError("Could not access microphone. Please check permissions.");
        }
      }

      // Create peer connection
      function createPeerConnection(userId) {
        const peerConnection = new RTCPeerConnection(rtcConfig);
        peerConnections.set(userId, peerConnection);

        // Add local stream
        if (localStream) {
          localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
          });
        }

        // Handle remote stream
        peerConnection.ontrack = (event) => {
          const remoteAudio = new Audio();
          remoteAudio.srcObject = event.streams[0];
          remoteAudio.play().catch((e) => console.log("Audio play error:", e));
        };

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              candidate: event.candidate,
              target: userId,
            });
          }
        };

        // Create and send offer
        peerConnection
          .createOffer()
          .then((offer) => peerConnection.setLocalDescription(offer))
          .then(() => {
            socket.emit("offer", {
              offer: peerConnection.localDescription,
              target: userId,
            });
          })
          .catch((error) => console.error("Error creating offer:", error));
      }

      // Handle incoming offer
      async function handleOffer(offer, senderId) {
        const peerConnection = new RTCPeerConnection(rtcConfig);
        peerConnections.set(senderId, peerConnection);

        // Add local stream
        if (localStream) {
          localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
          });
        }

        // Handle remote stream
        peerConnection.ontrack = (event) => {
          const remoteAudio = new Audio();
          remoteAudio.srcObject = event.streams[0];
          remoteAudio.play().catch((e) => console.log("Audio play error:", e));
        };

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              candidate: event.candidate,
              target: senderId,
            });
          }
        };

        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.emit("answer", {
          answer: answer,
          target: senderId,
        });
      }

      // Handle incoming answer
      async function handleAnswer(answer, senderId) {
        const peerConnection = peerConnections.get(senderId);
        if (peerConnection) {
          await peerConnection.setRemoteDescription(answer);
        }
      }

      // Handle ICE candidate
      async function handleIceCandidate(candidate, senderId) {
        const peerConnection = peerConnections.get(senderId);
        if (peerConnection) {
          await peerConnection.addIceCandidate(candidate);
        }
      }

      // Toggle mute
      function toggleMute() {
        if (!localStream) return;

        isMuted = !isMuted;
        localStream.getAudioTracks().forEach((track) => {
          track.enabled = !isMuted;
        });

        const muteButton = document.getElementById("muteButton");
        if (isMuted) {
          muteButton.textContent = "🔇 Muted";
          muteButton.classList.add("muted");
        } else {
          muteButton.textContent = "🎤 Unmuted";
          muteButton.classList.remove("muted");
        }

        socket.emit("toggle-mute", { isMuted });
      }

      // Leave room
      function leaveRoom() {
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
          localStream = null;
        }

        peerConnections.forEach((pc) => pc.close());
        peerConnections.clear();

        if (socket) {
          socket.disconnect();
        }

        isInRoom = false;
        currentRoom = null;
        currentUser = null;

        document.getElementById("welcomeScreen").classList.remove("hidden");
        document.getElementById("roomScreen").classList.add("hidden");

        // Reinitialize socket
        initSocket();
      }

      // UI functions
      function showRoom(roomCode) {
        document.getElementById("welcomeScreen").classList.add("hidden");
        document.getElementById("roomScreen").classList.remove("hidden");
        document.getElementById("currentRoomCode").textContent = roomCode;
      }

      function updateUsersList(users) {
        const usersList = document.getElementById("usersList");
        usersList.innerHTML = "";

        users.forEach((user) => {
          const userItem = document.createElement("div");
          userItem.className = "user-item";
          userItem.innerHTML = `
                    <span class="user-name">${user.name}</span>
                    <div class="status-indicator" id="status-${user.socketId}"></div>
                `;
          usersList.appendChild(userItem);
        });
      }

      function updateUserMuteStatus(userId, isMuted) {
        const statusIndicator = document.getElementById(`status-${userId}`);
        if (statusIndicator) {
          if (isMuted) {
            statusIndicator.classList.add("muted");
          } else {
            statusIndicator.classList.remove("muted");
          }
        }
      }

      function showError(message) {
        const errorDiv = document.getElementById("errorMessage");
        errorDiv.textContent = message;
        errorDiv.classList.remove("hidden");
        setTimeout(() => {
          errorDiv.classList.add("hidden");
        }, 5000);
      }

      function showStatus(message) {
        const statusDiv = document.getElementById("statusMessage");
        statusDiv.textContent = message;
        statusDiv.classList.remove("hidden");
        setTimeout(() => {
          statusDiv.classList.add("hidden");
        }, 3000);
      }

      // Enter key handlers
      document.getElementById("userName").addEventListener("keypress", (e) => {
        if (e.key === "Enter") createRoom();
      });

      document.getElementById("roomCode").addEventListener("keypress", (e) => {
        if (e.key === "Enter") joinRoom();
      });

      // Only allow numbers in room code
      document.getElementById("roomCode").addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      });

      // Initialize app
      document.addEventListener("DOMContentLoaded", () => {
        initSocket();
      });
    </script>
  </body>
</html>
