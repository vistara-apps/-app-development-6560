import React, { useState } from 'react';
import { Clock, Users, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { BetModal } from './BetModal';

export function MarketCard({ market, streamer, variant = 'active' }) {
  const [showBetModal, setShowBetModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const isActive = variant === 'active';
  const isResolved = variant === 'resolved';

  const getTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(market.endTime);
    const diff = endTime - now;
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleBet = (option) => {
    setSelectedOption(option);
    setShowBetModal(true);
  };

  const getOptionStyle = (option, optionKey) => {
    if (isResolved) {
      if (market.winningOption === optionKey) {
        return 'bg-green-500/20 border-green-500 text-green-400';
      } else {
        return 'bg-red-500/20 border-red-500 text-red-400';
      }
    }
    return 'bg-surface/50 border-surface hover:border-primary transition-colors cursor-pointer';
  };

  return (
    <>
      <div className="bg-surface rounded-lg p-6 shadow-card animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={streamer?.avatar}
              alt={streamer?.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{streamer?.name}</h3>
              <p className="text-sm text-muted">{streamer?.game}</p>
            </div>
          </div>
          
          {isActive && (
            <div className="flex items-center space-x-1 text-accent">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{getTimeRemaining()}</span>
            </div>
          )}
          
          {isResolved && (
            <div className="flex items-center space-x-1 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Resolved</span>
            </div>
          )}
        </div>

        {/* Question */}
        <h4 className="text-lg font-semibold mb-4 leading-6">{market.question}</h4>

        {/* Options */}
        <div className="space-y-3 mb-4">
          {market.options.map((option, index) => {
            const optionKey = `option${index + 1}`;
            const percentage = (option.bets / market.totalBets * 100) || 0;
            
            return (
              <div
                key={index}
                onClick={() => isActive && handleBet(option)}
                className={`p-4 rounded-md border ${getOptionStyle(option, optionKey)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{option.text}</span>
                  <div className="flex items-center space-x-2">
                    {isResolved && market.winningOption === optionKey && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                    {isResolved && market.winningOption !== optionKey && (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm font-semibold">{percentage.toFixed(1)}%</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-bg rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isResolved && market.winningOption === optionKey
                        ? 'bg-green-500'
                        : isResolved
                        ? 'bg-red-500'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-muted pt-4 border-t border-surface/50">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{market.totalBets} bets</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>{streamer?.tokenSymbol} {market.totalValue || '1,250'}</span>
          </div>
        </div>
      </div>

      {showBetModal && (
        <BetModal
          market={market}
          streamer={streamer}
          selectedOption={selectedOption}
          onClose={() => setShowBetModal(false)}
        />
      )}
    </>
  );
}