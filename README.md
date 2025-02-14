# Adventure Layer Faucet

Adventure Layer Faucet is a React-based web application for obtaining test AGLD tokens on the Adventure Layer Devnet test network. Users can receive 0.5 Devnet AGLD every 24 hours.

## ✨ Features

- 💳 Web3 wallet connection support
- 📱 Responsive design for both PC and mobile
- 🔒 Cloudflare Turnstile human verification integration
- 🌐 ENS domain resolution support
- ⚡ Real-time balance query
- 🎯 Daily limit of 0.5 Devnet AGLD

## 📁 Directory Structure

```
adventure-layer-faucet/
├── public/                 # Static resources
├── src/                    # Source code
│   ├── fonts/             # Font files
│   ├── img/               # Image resources
│   ├── libs/              # Utility libraries
│   ├── mobile/            # Mobile components
│   ├── App.js             # Main application component
│   ├── Home.js            # PC homepage component
│   ├── config.js          # Configuration file
│   └── index.js           # Application entry
└── package.json           # Project dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.14.0

### Installation

```bash
# Clone the project
git clone https://github.com/your-username/adventure-layer-faucet.git

# Enter project directory
cd adventure-layer-faucet

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm start
```

Visit http://localhost:3000 to view the application

### Build

```bash
# Build for production
npm run build
```

## 📦 Tech Stack

- React 18.3.1
- Web3.js 4.12.1
- Ethers.js 5.7.0
- Ant Design 5.17.0
- UseDApp Core 1.2.16

## 🔧 Configuration

### Environment Variables

Configure the following parameters in `config.js`:

```javascript
{
  faucetUrl: "Faucet API URL",
  explorerUrl: "Block Explorer URL",
  bridgeUrl: "Bridge URL",
  docsUrl: "Documentation URL",
  rpcUrl: "RPC Node URL",
  turnstileSiteKey: "Cloudflare Turnstile site key"
}
```

## 🌐 Deployment

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/build;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Other Deployment Options

- Cloudflare Pages
- Vercel
- GitHub Pages

## 💻 Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| >= 88                                                                                                                                                                                                            | >= 78                                                                                                                                                                                                              | >= 14                                                                                                                                                                                                            | >= 88                                                                                                                                                                                                          |

## ⚠️ Important Notes

1. Ensure all API endpoints are correctly configured before deployment
2. Verify Cloudflare Turnstile configuration
3. Maintain stable testnet RPC node availability
4. Configure CORS policy for security

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 📧 Contact

Project Maintainer - [@your-username](https://github.com/your-username)

Project Link: [https://github.com/your-username/adventure-layer-faucet](https://github.com/your-username/adventure-layer-faucet)
