import React, { useState } from 'react';
import { X, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

export function BetModal({ market, streamer, selectedOption, onClose }) {
  const [betAmount, setBetAmount] = useState('');
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const { createSession } = usePaymentContext();

  const handlePlaceBet = async () => {
    if (!betAmount || parseFloat(betAmount) <= 0) return;
    
    setIsPlacingBet(true);
    try {
      // Simulate AgentKit gasless transaction
      await createSession();
      
      // Simulate bet placement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Successfully placed bet of ${betAmount} ${streamer.tokenSymbol} on "${selectedOption.text}"`);
      onClose();
    } catch (error) {
      console.error('Bet failed:', error);
      alert('Failed to place bet. Please try again.');
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
          <p className="text-sm text-accent">
            This bet will be placed gaslessly using AgentKit. Make sure you have sufficient {streamer.tokenSymbol} tokens.
          </p>
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
            disabled={!betAmount || parseFloat(betAmount) <= 0 || isPlacingBet}
            className="flex-1 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed rounded-md font-medium transition-colors"
          >
            {isPlacingBet ? 'Placing Bet...' : 'Place Bet'}
          </button>
        </div>
      </div>
    </div>
  );
}