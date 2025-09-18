# 0xGasless AgentKit Integration

This document describes the integration of 0xGasless AgentKit into the StreamBet application, enabling gasless transactions and account abstraction for betting operations.

## Overview

AgentKit is integrated to provide:
- ✅ Gasless token transfers for betting
- ✅ Account abstraction using ERC-4337 standard
- ✅ Multi-chain support (Base, Fantom, Moonbeam, etc.)
- ✅ Real-time balance checking
- ✅ Smart account management

## Implementation

### 1. Package Installation

The AgentKit package is installed via npm:
```bash
npm install @0xgasless/agentkit@^0.0.16
```

### 2. Hook Integration (`src/hooks/useAgentKit.js`)

The `useAgentKit` hook provides:
- AgentKit initialization with wallet connection
- Balance checking functionality
- Gasless token transfer capabilities
- Smart account address retrieval
- Error handling and loading states

### 3. UI Components

#### BetModal Enhancement
- Integrated AgentKit status indicators
- Gasless bet placement functionality
- Real-time balance verification
- Enhanced error handling with AgentKit-specific messaging

#### AgentKitStatus Component
- Visual status indicator in the app header
- Shows initialization progress
- Displays ready/error states
- Provides user feedback on AgentKit availability

### 4. Configuration

Environment variables in `.env`:
```bash
# 0xGasless AgentKit Configuration
REACT_APP_AGENTKIT_API_KEY=your_api_key_here
REACT_APP_BASE_RPC_URL=https://mainnet.base.org
REACT_APP_DEFAULT_CHAIN_ID=8453
```

## Features Implemented

### Gasless Betting
- Users can place bets without holding native tokens for gas
- Automatic balance checking before bet placement
- Integration with existing payment context
- Support for ERC-20 token transfers

### Smart Account Integration
- Automatic smart account creation and management
- Secure private key handling
- Multi-chain compatibility
- Account abstraction benefits

### User Experience
- Clear status indicators for AgentKit readiness
- Informative error messages
- Loading states during initialization
- Seamless integration with existing wallet connection flow

## Available Actions

The integration includes these AgentKit actions:

1. **GetBalanceAction**: Check ETH and token balances
2. **SmartTransferAction**: Transfer tokens gaslessly
3. **GetAddressAction**: Retrieve smart account address

## Token Support

The application supports real token addresses on Base network:
- USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- DAI: `0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb`
- WETH: `0x4200000000000000000000000000000000000006`

## Usage Flow

1. User connects wallet via RainbowKit
2. AgentKit automatically initializes with connected wallet
3. Status indicator shows "Gasless Ready" when initialized
4. User selects a betting market and amount
5. BetModal shows AgentKit status and gasless capabilities
6. On bet placement:
   - Smart account address is retrieved
   - Token balance is checked
   - Payment session is created
   - Gasless transfer is executed
   - Success/error feedback is provided

## Error Handling

The integration includes comprehensive error handling:
- Wallet connection errors
- AgentKit initialization failures
- Insufficient balance detection
- Transfer execution errors
- Network connectivity issues

## Security Considerations

- Private keys are handled securely through wallet clients
- Demo private key is used for development/testing
- API keys are managed through environment variables
- All transactions go through AgentKit's secure infrastructure

## Testing

To test the integration:
1. Connect a wallet with Base network support
2. Ensure you have test tokens (or use testnet)
3. Navigate to any betting market
4. Place a bet to test gasless functionality
5. Monitor console logs for transaction details

## Future Enhancements

Potential improvements:
- Support for more AgentKit actions (swaps, deployments)
- Integration with additional networks
- Enhanced balance display with real-time updates
- Batch transaction capabilities
- Advanced smart account features

## References

- [0xGasless AgentKit Documentation](https://docs.0xgasless.com/docs)
- [AgentKit GitHub Repository](https://github.com/0xgasless/agentkit)
- [ERC-4337 Standard](https://eips.ethereum.org/EIPS/eip-4337)