import React from 'react';
import { MarketCard } from './MarketCard';

export function MarketGrid({ markets, streamers }) {
  const activeMarkets = markets.filter(market => market.status === 'active');
  const resolvedMarkets = markets.filter(market => market.status === 'resolved');

  return (
    <div className="space-y-8">
      {/* Active Markets */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Live Prediction Markets</h2>
          <span className="text-sm text-muted">{activeMarkets.length} active</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeMarkets.map((market) => {
            const streamer = streamers.find(s => s.streamerId === market.streamerId);
            return (
              <MarketCard
                key={market.marketId}
                market={market}
                streamer={streamer}
                variant="active"
              />
            );
          })}
        </div>
      </section>

      {/* Resolved Markets */}
      {resolvedMarkets.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recently Resolved</h2>
            <span className="text-sm text-muted">{resolvedMarkets.length} resolved</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resolvedMarkets.slice(0, 6).map((market) => {
              const streamer = streamers.find(s => s.streamerId === market.streamerId);
              return (
                <MarketCard
                  key={market.marketId}
                  market={market}
                  streamer={streamer}
                  variant="resolved"
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}