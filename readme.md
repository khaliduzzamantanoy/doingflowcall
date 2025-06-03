# 🎙️ Voice Chat Rooms

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-v4.7.4-blue.svg)](https://socket.io/)
[![WebRTC](https://img.shields.io/badge/WebRTC-Enabled-orange.svg)](https://webrtc.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A real-time voice chat application where users can join rooms using 6-digit codes. Built with Node.js, Socket.IO, and WebRTC for high-quality, peer-to-peer audio communication.

![Voice Chat Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Voice+Chat+Rooms)

## ✨ Features

- 🎯 **6-digit room codes** - Easy to remember and share
- 🔊 **High-quality audio** - WebRTC with noise suppression and echo cancellation
- ⚡ **Real-time communication** - Instant connection with Socket.IO
- 🎤 **Mute/unmute functionality** - Control your audio input
- 👥 **Voice activity detection** - Visual indicators when someone is speaking
- 📱 **Cross-platform** - Works on desktop and mobile browsers
- 🌐 **Network flexible** - Compatible with ngrok, Cloudflare tunnels, and direct hosting
- 🔒 **Privacy-focused** - No audio recording or server storage
- 🎨 **Modern UI** - Beautiful glassmorphism design

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn
- Modern web browser with WebRTC support

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/voice-chat-rooms.git
   cd voice-chat-rooms
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

That's it! 🎉 Your voice chat server is now running!

## 🌐 Deployment & Network Access

### Local Development

```bash
npm start
# Access at http://localhost:3000
```

### Using ngrok (Recommended for testing)

```bash
# Install ngrok globally
npm install -g ngrok

# Start your server
npm start

# In another terminal, create tunnel
ngrok http 3000

# Share the ngrok URL with others
```

### Using Cloudflare Tunnel

```bash
# Install cloudflared
# Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

# Create tunnel
cloudflared tunnel --url http://localhost:3000
```

### Production Deployment

#### Heroku

```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy to Heroku
heroku create your-voice-chat-app
git push heroku main
```

#### Railway

```bash
# Connect your GitHub repo to Railway
# Set PORT environment variable (automatic)
# Deploy with one click
```

#### DigitalOcean/VPS

```bash
# Install Node.js on your server
# Clone repository
# Install dependencies
# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name voice-chat
pm2 startup
pm2 save
```

## 🎯 How to Use

### For Users

1. **📝 Enter your name** - Required for identification
2. **🔢 Join existing room** - Enter a 6-digit code (e.g., 123456)
3. **➕ Create new room** - Generate a new room and share the code
4. **🎤 Use voice controls** - Mute/unmute and leave room
5. **👀 Visual feedback** - See when others are speaking

### For Developers

```javascript
// Basic usage example
const app = require("./server");
// Server automatically handles:
// - Room management
// - WebRTC signaling
// - User sessions
// - Audio streaming
```

## 🔧 Audio Quality Features

| Feature               | Description                 | Benefit              |
| --------------------- | --------------------------- | -------------------- |
| **Echo Cancellation** | Eliminates audio feedback   | Clear conversations  |
| **Noise Suppression** | Reduces background noise    | Professional quality |
| **Auto Gain Control** | Normalizes volume levels    | Consistent audio     |
| **48kHz Sample Rate** | High-quality audio sampling | Crystal clear sound  |
| **Peer-to-peer**      | Direct connections          | Low latency          |

## 📱 Browser Compatibility

| Browser | Desktop | Mobile | Notes              |
| ------- | ------- | ------ | ------------------ |
| Chrome  | ✅      | ✅     | Best performance   |
| Firefox | ✅      | ✅     | Fully supported    |
| Safari  | ✅      | ✅     | iOS 14.3+ required |
| Edge    | ✅      | ✅     | Chromium-based     |

> **Note:** Microphone access required. Users will be prompted for permissions.

## 🏗️ Project Structure

```
voice-chat-rooms/
├── 📄 server.js              # Node.js server with Socket.IO
├── 📄 package.json           # Dependencies and scripts
├── 📁 public/
│   └── 📄 index.html         # Client-side application
├── 📄 README.md              # This file
├── 📄 LICENSE                # MIT License
└── 📄 .gitignore            # Git ignore rules
```

## 🛠️ Development

### Run in development mode

```bash
npm run dev
# Uses nodemon for auto-restart
```

### Environment Variables

```bash
# .env file (optional)
PORT=3000                    # Server port
NODE_ENV=development         # Environment
```

### Scripts

```bash
npm start                    # Start production server
npm run dev                  # Start development server
npm test                     # Run tests (coming soon)
```

## 🔒 Security & Privacy

- ✅ **No audio recording** - Conversations are not stored
- ✅ **Peer-to-peer audio** - Direct connections between users
- ✅ **Session-based** - No persistent user data
- ✅ **Auto cleanup** - Empty rooms are automatically removed
- ✅ **HTTPS ready** - SSL/TLS support for production
- ✅ **CORS enabled** - Works with tunneling services

## 🌟 Technical Details

### Server Architecture

- **Express.js** - Web server framework
- **Socket.IO** - Real-time bidirectional communication
- **WebRTC Signaling** - Handles peer connection setup
- **Room Management** - Automatic room creation and cleanup

### Client Architecture

- **WebRTC** - Peer-to-peer audio connections
- **MediaDevices API** - Microphone access and control
- **Web Audio API** - Voice activity detection
- **Responsive Design** - Mobile-first approach

### Audio Configuration

```javascript
const audioConstraints = {
  audio: {
    echoCancellation: true, // Remove echo
    noiseSuppression: true, // Reduce noise
    autoGainControl: true, // Normalize volume
    sampleRate: 48000, // High quality
    channelCount: 1, // Mono audio
  },
};
```

## 🚨 Troubleshooting

### Common Issues

<details>
<summary>🎤 Microphone not working</summary>

**Solutions:**

- Check browser permissions (camera/microphone)
- Ensure HTTPS in production (required for WebRTC)
- Try different browser
- Check system microphone settings
- Disable browser extensions that might block audio

</details>

<details>
<summary>🔗 Can't connect to others</summary>

**Solutions:**

- Ensure both users are in the same room
- Check firewall settings
- Try different network (mobile hotspot)
- Verify room code is correct (6 digits)
- Refresh the page and try again

</details>

<details>
<summary>📢 Poor audio quality</summary>

**Solutions:**

- Check internet connection speed
- Close bandwidth-heavy applications
- Use wired internet connection
- Try different browser
- Check microphone quality

</details>

<details>
<summary>🌐 Server won't start</summary>

**Solutions:**

- Check if port 3000 is available: `lsof -i :3000`
- Install dependencies: `npm install`
- Check Node.js version: `node --version`
- Try different port: `PORT=8080 npm start`

</details>

### HTTPS Requirements

For production deployment, HTTPS is **required** for microphone access:

- **Let's Encrypt** - Free SSL certificates
- **Cloudflare SSL** - Easy SSL setup
- **ngrok** - Provides HTTPS automatically
- **Heroku/Railway** - HTTPS by default

## 📊 Performance

- **Latency:** < 100ms (peer-to-peer)
- **Bandwidth:** ~64 kbps per connection
- **Concurrent users:** Limited by server resources
- **Room capacity:** Recommended 2-8 users per room

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💻 Make your changes**
4. **✅ Test your changes**
5. **📝 Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **🚀 Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **🔄 Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Update documentation as needed

## 📋 Roadmap

- [ ] 🎥 Video chat support
- [ ] 💬 Text chat integration
- [ ] 🎨 Custom themes
- [ ] 📱 Mobile app (React Native)
- [ ] 🔐 Room passwords
- [ ] 👑 Room moderator controls
- [ ] 📊 Connection quality indicators
- [ ] 🌍 Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Voice Chat Rooms

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) - Real-time communication
- [WebRTC](https://webrtc.org/) - Peer-to-peer audio/video
- [Express.js](https://expressjs.com/) - Web framework
- [Node.js](https://nodejs.org/) - Runtime environment

## 📞 Support

- 📧 **Email:** support@voicechatrooms.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/yourusername/voice-chat-rooms/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/yourusername/voice-chat-rooms/discussions)
- 📖 **Wiki:** [Project Wiki](https://github.com/yourusername/voice-chat-rooms/wiki)

## ⭐ Show Your Support

If this project helped you, please consider:

- ⭐ Starring this repository
- 🍴 Forking and contributing
- 📢 Sharing with others
- 💝 [Sponsoring the project](https://github.com/sponsors/yourusername)

---

<div align="center">

**Ready to start chatting? 🎉**

[🚀 Deploy Now](https://heroku.com/deploy) | [📖 Documentation](https://github.com/yourusername/voice-chat-rooms/wiki) | [💬 Community](https://github.com/yourusername/voice-chat-rooms/discussions)

---

Made with ❤️ by developers, for developers

**Star ⭐ this repo if you found it helpful!**

</div>
