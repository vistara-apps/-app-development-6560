import React, { useState } from 'react';
import { X, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';
import { useAgentKit } from '../hooks/useAgentKit';

export function BetModal({ market, streamer, selectedOption, onClose }) {
  const [betAmount, setBetAmount] = useState('');
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const { createSession } = usePaymentContext();
  const { 
    isReady: isAgentKitReady, 
    smartTransfer, 
    getBalance, 
    getSmartAccountAddress,
    error: agentKitError,
    isInitializing 
  } = useAgentKit();

  const handlePlaceBet = async () => {
    if (!betAmount || parseFloat(betAmount) <= 0) return;
    
    if (!isAgentKitReady) {
      alert('AgentKit is not ready. Please wait for initialization.');
      return;
    }

    setIsPlacingBet(true);
    try {
      // Get smart account address
      const smartAccountAddress = await getSmartAccountAddress();
      console.log('Smart Account Address:', smartAccountAddress);

      // Check balance before placing bet
      const balanceResult = await getBalance(
        streamer.tokenAddress ? [streamer.tokenAddress] : null,
        streamer.tokenAddress ? null : [streamer.tokenSymbol]
      );
      console.log('Current balance:', balanceResult);

      // Create payment session for verification
      await createSession();
      
      // Simulate gasless bet placement using AgentKit
      // In a real implementation, this would transfer tokens to a betting contract
      const betContractAddress = '0x742d35Cc6634C0532925a3b8D7389B5B6f6c4b0d'; // Example betting contract
      
      if (streamer.tokenAddress && streamer.tokenAddress !== '0x0000000000000000000000000000000000000000') {
        // Transfer ERC20 tokens gaslessly
        const transferResult = await smartTransfer(
          betAmount,
          streamer.tokenAddress,
          betContractAddress
        );
        console.log('Gasless transfer result:', transferResult);
      } else {
        // For native tokens, simulate the transaction
        console.log(`Would transfer ${betAmount} ${streamer.tokenSymbol} to betting contract`);
      }
      
      alert(`Successfully placed gasless bet of ${betAmount} ${streamer.tokenSymbol} on "${selectedOption.text}" using AgentKit!`);
      onClose();
    } catch (error) {
      console.error('Bet failed:', error);
      alert(`Failed to place bet: ${error.message}`);
    } finally {
      setIsPlacingBet(false);
    }
  };

  const calculatePotentialWin = () => {
    if (!betAmount) return '0';
    const amount = parseFloat(betAmount);
    const percentage = (selectedOption.bets / market.totalBets * 100) || 50;
    const multiplier = percentage < 50 ? 2.5 : 1.5;
    return (amount * multiplier).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-md w-full p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Place Bet</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-bg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Market Info */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={streamer.avatar}
              alt={streamer.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{streamer.name}</h3>
              <p className="text-sm text-muted">{streamer.game}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted mb-2">{market.question}</p>
          <div className="bg-primary/20 border border-primary rounded-md p-3">
            <p className="font-medium text-primary">{selectedOption.text}</p>
          </div>
        </div>

        {/* Bet Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Bet Amount ({streamer.tokenSymbol})
          </label>
          <div className="relative">
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full bg-bg border border-surface rounded-md px-4 py-3 text-lg font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {streamer.tokenSymbol}
            </div>
          </div>
          
          {/* Quick amounts */}
          <div className="flex space-x-2 mt-3">
            {['10', '25', '50', '100'].map((amount) => (
              <button
                key={amount}
                onClick={() => setBetAmount(amount)}
                className="flex-1 py-2 text-sm bg-bg hover:bg-surface border border-surface rounded-md transition-colors"
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Bet Summary */}
        {betAmount && (
          <div className="bg-bg rounded-md p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Bet Amount:</span>
              <span>{betAmount} {streamer.tokenSymbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Potential Win:</span>
              <span className="text-accent font-medium">
                {calculatePotentialWin()} {streamer.tokenSymbol}
              </span>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="flex items-start space-x-2 p-3 bg-accent/10 border border-accent/20 rounded-md mb-6">
          <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <div className="text-sm text-accent">
            <p>This bet will be placed gaslessly using 0xGasless AgentKit.</p>
            {agentKitError && (
              <p className="mt-1 text-red-400">AgentKit Error: {agentKitError}</p>
            )}
            {isInitializing && (
              <p className="mt-1 text-blue-400">Initializing AgentKit...</p>
            )}
            {isAgentKitReady && (
              <p className="mt-1 text-green-400">✓ AgentKit ready for gasless transactions</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-surface rounded-md font-medium hover:bg-surface transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePlaceBet}
            disabled={!betAmount || parseFloat(betAmount) <= 0 || isPlacingBet || !isAgentKitReady}
            className="flex-1 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed rounded-md font-medium transition-colors"
          >
            {isPlacingBet ? 'Placing Gasless Bet...' : 
             !isAgentKitReady ? 'Initializing AgentKit...' : 
             'Place Gasless Bet'}
          </button>
        </div>
      </div>
    </div>
  );
}