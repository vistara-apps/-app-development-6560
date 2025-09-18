# StreamBet

A decentralized betting platform for streaming content with gasless transactions powered by 0xGasless AgentKit.

## Features

### Core Betting Platform
- 🎮 **Stream-based Betting**: Bet on live streaming events and outcomes
- 📊 **Real-time Markets**: Dynamic betting markets with live odds
- 👥 **Streamer Integration**: Support for popular streamers and their communities
- 💰 **Multi-token Support**: Bet with various ERC-20 tokens

### 0xGasless AgentKit Integration
- ⛽ **Gasless Transactions**: Place bets without holding native tokens for gas
- 🔐 **Account Abstraction**: Built on ERC-4337 standard for enhanced UX
- 🌐 **Multi-chain Support**: Works across Base, Fantom, Moonbeam, and more
- 💡 **Smart Account Management**: Automatic smart account creation and management

## Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Wallet Integration**: RainbowKit, Wagmi
- **Blockchain**: EVM-compatible chains (Base, Ethereum, etc.)
- **Gasless Infrastructure**: 0xGasless AgentKit
- **Payment Processing**: x402-axios for micropayments

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Web3 wallet (MetaMask, WalletConnect, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vistara-apps/-app-development-6560.git
cd -app-development-6560
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### Environment Configuration

Create a `.env` file with the following variables:

```bash
# 0xGasless AgentKit Configuration
REACT_APP_AGENTKIT_API_KEY=your_agentkit_api_key_here

# RPC URLs for different networks
REACT_APP_BASE_RPC_URL=https://mainnet.base.org
REACT_APP_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Default Chain ID (Base = 8453, Base Sepolia = 84532)
REACT_APP_DEFAULT_CHAIN_ID=8453
```

## Usage

### Connecting Your Wallet
1. Click the "Connect Wallet" button in the top right
2. Select your preferred wallet provider
3. Approve the connection request
4. Wait for AgentKit to initialize (status shown in header)

### Placing Gasless Bets
1. Browse available markets in the "Markets" tab
2. Select a market and betting option
3. Enter your bet amount
4. Click "Place Gasless Bet"
5. Confirm the transaction (no gas fees required!)

### Supported Networks
- **Base Mainnet** (Chain ID: 8453)
- **Base Sepolia** (Chain ID: 84532) - Testnet
- Additional networks supported by 0xGasless AgentKit

### Supported Tokens
- **USDC**: Native USDC on Base network
- **DAI**: Bridged DAI on Base network  
- **WETH**: Wrapped ETH on Base network
- Custom streamer tokens (coming soon)

## Architecture

### Components
- `AppShell`: Main application layout with navigation
- `MarketGrid`: Display of available betting markets
- `BetModal`: Gasless bet placement interface
- `AgentKitStatus`: Real-time AgentKit status indicator
- `StreamerGrid`: Streamer profiles and information

### Hooks
- `useAgentKit`: AgentKit integration and gasless transaction management
- `usePaymentContext`: Payment session management with x402-axios

### AgentKit Integration
The application integrates 0xGasless AgentKit for:
- Gasless token transfers
- Smart account management
- Balance checking
- Multi-chain support

See [AGENTKIT_INTEGRATION.md](./AGENTKIT_INTEGRATION.md) for detailed technical documentation.

## Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Project Structure
```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── data/               # Mock data and constants
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the [AgentKit documentation](https://docs.0xgasless.com/docs)
- Review the [technical integration guide](./AGENTKIT_INTEGRATION.md)
- Open an issue in this repository

## Acknowledgments

- **0xGasless Team** for the AgentKit infrastructure
- **RainbowKit** for wallet connection utilities
- **Vite** for fast development experience
- **Tailwind CSS** for styling system