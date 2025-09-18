import React from 'react';
import { Users, TrendingUp, ExternalLink } from 'lucide-react';

export function StreamerCard({ streamer, onSelect }) {
  return (
    <div className="bg-surface rounded-lg p-6 shadow-card hover:shadow-lg transition-all duration-200 animate-fade-in group cursor-pointer"
         onClick={onSelect}>
      {/* Avatar and Status */}
      <div className="relative mb-4">
        <img
          src={streamer.avatar}
          alt={streamer.name}
          className="w-16 h-16 rounded-full mx-auto"
        />
        {streamer.isLive && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Streamer Info */}
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg mb-1">{streamer.name}</h3>
        <p className="text-muted text-sm mb-2">{streamer.game}</p>
        
        {streamer.isLive && (
          <span className="inline-flex items-center px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1 animate-pulse" />
            LIVE
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-muted">
            <Users className="w-4 h-4" />
            <span className="text-sm">Followers</span>
          </div>
          <span className="text-sm font-medium">{streamer.followers.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-muted">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Token</span>
          </div>
          <span className="text-sm font-medium">{streamer.tokenSymbol}</span>
        </div>
      </div>

      {/* Token Price */}
      <div className="bg-bg rounded-md p-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Token Price</span>
          <div className="text-right">
            <span className="font-medium">${streamer.tokenPrice}</span>
            <div className={`text-xs ${streamer.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {streamer.priceChange >= 0 ? '+' : ''}{streamer.priceChange.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <button className="w-full py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-md font-medium transition-colors group-hover:bg-primary group-hover:text-white">
        View Markets
      </button>
    </div>
  );
}