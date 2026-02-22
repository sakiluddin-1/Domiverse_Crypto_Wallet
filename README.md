🦊 Domiverse Wallet – Decentralized Web3 Chrome Extension

A secure, lightweight, decentralized crypto wallet built as a Chrome Extension, allowing users to create accounts, manage assets, and send transactions on EVM-compatible blockchains.

🚀 Built with JavaScript, Node.js, MongoDB, and ethers.js

✨ Features

🔐 Create a new wallet (public address + private key)

🔑 Login to existing wallet

📥 Import wallet using private key

💰 Check ETH balance

💸 Send transactions to other addresses

🪙 View ERC-20 tokens

🌐 Switch between networks (Ethereum, Sepolia, Polygon)

🧾 View account list

📋 Copy wallet address easily

🖥️ Tech Stack
Frontend (Chrome Extension)

HTML

CSS

Vanilla JavaScript

Chrome Extension APIs

Blockchain Integration

ethers.js

Backend API

Node.js

Express.js

MongoDB (Mongoose)

📁 Project Structure
Domiverse-Wallet/
│
├── chromeapi/                 # Chrome extension frontend
│   ├── popup.html
│   ├── popup.js
│   ├── style.css
│   ├── assets/
│
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│
├── config.env
├── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/domiverse-wallet.git
cd domiverse-wallet
2️⃣ Install dependencies
npm install
3️⃣ Setup Environment Variables

Create a file named config.env in the root:

DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/
DATABASE_PASSWORD=yourpassword
PORT=3000
4️⃣ Run backend server
npm run start

Server will run at:

http://localhost:3000
5️⃣ Load Chrome Extension

Open Chrome

Go to chrome://extensions/

Enable Developer Mode

Click Load Unpacked

Select the chromeapi folder

🔐 Security Notes

Private keys are stored securely in local storage (for development)

In production, encryption should be added

Never expose your private key publicly

📡 API Endpoints
Tokens
GET /api/v1/tokens/alltoken
Accounts
GET /api/v1/account/allaccount
📸 Screenshots

(Add screenshots here for UI, wallet dashboard, transfer page, etc.)

🚀 Future Improvements

🔒 Encrypt private keys using AES

🧠 Add biometric / password protection

🔁 Add transaction history

📊 Gas fee estimation

🔗 WalletConnect integration

🪙 Multi-chain support

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

📄 License

This project is licensed under the MIT License.