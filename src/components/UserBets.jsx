import React from 'react';
import { Trophy, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export function UserBets({ bets, markets, streamers }) {
  const activeBets = bets.filter(bet => bet.status === 'active');
  const wonBets = bets.filter(bet => bet.status === 'won');
  const lostBets = bets.filter(bet => bet.status === 'lost');

  const getBetDetails = (bet) => {
    const market = markets.find(m => m.marketId === bet.marketId);
    const streamer = streamers.find(s => s.streamerId === market?.streamerId);
    return { market, streamer };
  };

  const BetCard = ({ bet }) => {
    const { market, streamer } = getBetDetails(bet);
    if (!market || !streamer) return null;

    const getStatusIcon = () => {
      switch (bet.status) {
        case 'active':
          return <Clock className="w-4 h-4 text-accent" />;
        case 'won':
          return <CheckCircle className="w-4 h-4 text-green-400" />;
        case 'lost':
          return <XCircle className="w-4 h-4 text-red-400" />;
        default:
          return null;
      }
    };

    const getStatusColor = () => {
      switch (bet.status) {
        case 'active':
          return 'border-accent/20 bg-accent/10';
        case 'won':
          return 'border-green-500/20 bg-green-500/10';
        case 'lost':
          return 'border-red-500/20 bg-red-500/10';
        default:
          return 'border-surface';
      }
    };

    return (
      <div className={`bg-surface rounded-lg p-4 border ${getStatusColor()}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={streamer.avatar}
              alt={streamer.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h4 className="font-medium text-sm">{streamer.name}</h4>
              <p className="text-xs text-muted">{streamer.game}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className="text-sm font-medium capitalize">{bet.status}</span>
          </div>
        </div>

        <p className="text-sm mb-3 leading-5">{market.question}</p>
        
        <div className="bg-bg rounded-md p-3 mb-3">
          <p className="text-sm font-medium text-primary mb-1">Your Prediction:</p>
          <p className="text-sm">{bet.selectedOption}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-muted">Bet: </span>
            <span className="font-medium">{bet.amount} {streamer.tokenSymbol}</span>
          </div>
          
          {bet.status === 'won' && (
            <div className="text-green-400">
              <span className="text-muted">Won: </span>
              <span className="font-medium">{bet.payout} {streamer.tokenSymbol}</span>
            </div>
          )}
          
          {bet.status === 'active' && (
            <div className="text-accent">
              <span className="text-muted">Potential: </span>
              <span className="font-medium">{(bet.amount * 1.8).toFixed(2)} {streamer.tokenSymbol}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-lg mx-auto mb-2">
            <Clock className="w-5 h-5 text-accent" />
          </div>
          <div className="text-2xl font-bold">{activeBets.length}</div>
          <div className="text-sm text-muted">Active Bets</div>
        </div>
        
        <div className="bg-surface rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-lg mx-auto mb-2">
            <Trophy className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold">{wonBets.length}</div>
          <div className="text-sm text-muted">Won Bets</div>
        </div>
        
        <div className="bg-surface rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold">
            {bets.length > 0 ? ((wonBets.length / bets.length) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-muted">Win Rate</div>
        </div>
      </div>

      {/* Active Bets */}
      {activeBets.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Active Bets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBets.map((bet) => (
              <BetCard key={bet.betId} bet={bet} />
            ))}
          </div>
        </section>
      )}

      {/* Won Bets */}
      {wonBets.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Wins</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wonBets.slice(0, 4).map((bet) => (
              <BetCard key={bet.betId} bet={bet} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {bets.length === 0 && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-surface rounded-full mx-auto mb-4">
            <Trophy className="w-8 h-8 text-muted" />
          </div>
          <h3 className="text-lg font-medium mb-2">No bets yet</h3>
          <p className="text-muted mb-4">Start by exploring prediction markets and placing your first bet!</p>
          <button className="px-6 py-2 bg-primary hover:bg-primary/90 rounded-md font-medium transition-colors">
            Browse Markets
          </button>
        </div>
      )}
    </div>
  );
}