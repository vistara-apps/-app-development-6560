import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TrendingUp, Users, Trophy, Menu, ArrowLeft } from 'lucide-react';

export function AppShell({ children, activeTab, onTabChange, selectedStreamer, onClearStreamer }) {
  const tabs = [
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'streamers', label: 'Streamers', icon: Users },
    { id: 'mybets', label: 'My Bets', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="bg-surface border-b border-surface/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {selectedStreamer && (
                <button
                  onClick={onClearStreamer}
                  className="p-2 rounded-md hover:bg-surface/50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-md flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">StreamBet</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ConnectButton />
            </div>
          </div>
          
          {selectedStreamer && (
            <div className="pb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedStreamer.avatar}
                  alt={selectedStreamer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold">{selectedStreamer.name}</h2>
                  <p className="text-sm text-muted">{selectedStreamer.game}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-surface border-b border-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted hover:text-text hover:border-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}