import React, { useState } from 'react';
import { AppShell } from './components/AppShell';
import { MarketGrid } from './components/MarketGrid';
import { StreamerGrid } from './components/StreamerGrid';
import { UserBets } from './components/UserBets';
import { mockStreamers, mockMarkets, mockUserBets } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('markets');
  const [selectedStreamer, setSelectedStreamer] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'markets':
        return (
          <MarketGrid 
            markets={selectedStreamer ? mockMarkets.filter(m => m.streamerId === selectedStreamer.streamerId) : mockMarkets}
            streamers={mockStreamers}
          />
        );
      case 'streamers':
        return (
          <StreamerGrid 
            streamers={mockStreamers}
            onStreamerSelect={setSelectedStreamer}
          />
        );
      case 'mybets':
        return (
          <UserBets 
            bets={mockUserBets}
            markets={mockMarkets}
            streamers={mockStreamers}
          />
        );
      default:
        return <MarketGrid markets={mockMarkets} streamers={mockStreamers} />;
    }
  };

  return (
    <AppShell 
      activeTab={activeTab}
      onTabChange={setActiveTab}
      selectedStreamer={selectedStreamer}
      onClearStreamer={() => setSelectedStreamer(null)}
    >
      {renderContent()}
    </AppShell>
  );
}

export default App;