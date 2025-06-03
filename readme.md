# DoingFlow Call 📞

**Real-time voice chat application with room-based communication using 6-digit codes**

DoingFlow Call is a modern, web-based voice chat application that allows users to create or join voice chat rooms using simple 6-digit codes. Built with Node.js, WebRTC, and Socket.IO for high-quality, real-time audio communication.

## ✨ Features

- 🎯 **Simple Room System**: Create or join rooms with 6-digit codes
- 🎤 **High-Quality Audio**: WebRTC with noise suppression, echo cancellation
- 🌐 **Universal Access**: Works with any network, ngrok, Cloudflare tunnels
- 📱 **Responsive Design**: Mobile and desktop friendly
- 🔇 **Mute Controls**: Easy mute/unmute functionality
- 👥 **Live User List**: See who's connected in real-time
- 🚀 **No Registration**: Just enter your name and start talking
- 🔒 **Private Rooms**: Each room is isolated with unique codes

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/khaliduzzamantanoy/doingflowcall.git
cd doingflowcall
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the server**

```bash
npm start
```

4. **Open your browser**

```
http://localhost:3000
```

### Development Mode

```bash
npm run dev
```

## 🌐 External Access

### Using ngrok

```bash
# Install ngrok globally
npm install -g ngrok

# Start your server
npm start

# In another terminal
ngrok http 3000
```

### Using Cloudflare Tunnel

```bash
# Install cloudflared
# Then run:
cloudflared tunnel --url http://localhost:3000
```

## 📖 How to Use

### Creating a Room

1. Enter your name
2. Click "Create Room"
3. Share the 6-digit code with others
4. Start talking when others join

### Joining a Room

1. Enter your name
2. Enter the 6-digit room code
3. Click "Join Room"
4. You'll be connected automatically

### During the Call

- **Mute/Unmute**: Click the microphone button
- **See Participants**: View live user list with status indicators
- **Leave**: Click the "Leave" button to exit

## 🔧 Technical Details

### Built With

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Communication**: WebRTC for peer-to-peer audio
- **Real-time**: Socket.IO for signaling

### Audio Quality Features

- **Sample Rate**: 48kHz for high-fidelity audio
- **Echo Cancellation**: Eliminates audio feedback
- **Noise Suppression**: Filters background noise
- **Auto Gain Control**: Normalizes volume levels
- **STUN Servers**: For NAT traversal and connectivity

### Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Client A    │    │   DoingFlow     │    │     Client B    │
│                 │    │   Call Server   │    │                 │
│                 │◄──►│                 │◄──►│                 │
│   WebRTC P2P    │    │  Socket.IO      │    │   WebRTC P2P    │
│   Audio Stream  │    │  Signaling      │    │   Audio Stream  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
doingflowcall/
├── server.js              # Node.js server with Socket.IO
├── public/
│   └── index.html         # Client-side application
├── package.json           # Dependencies and scripts
├── README.md             # This file
└── LICENSE               # MIT License
```

## 🚀 Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main
```

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MD KHALIDUZZAMAN TANOY**

- GitHub: [@khaliduzzamantanoy](https://github.com/khaliduzzamantanoy)

## 🙏 Acknowledgments

- WebRTC for real-time communication
- Socket.IO for seamless signaling
- Google STUN servers for connectivity

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**Made with ❤️ by MD KHALIDUZZAMAN TANOY**
