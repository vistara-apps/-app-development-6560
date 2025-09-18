import React from 'react';
import { StreamerCard } from './StreamerCard';

export function StreamerGrid({ streamers, onStreamerSelect }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Featured Streamers</h2>
        <span className="text-sm text-muted">{streamers.length} streamers</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {streamers.map((streamer) => (
          <StreamerCard
            key={streamer.streamerId}
            streamer={streamer}
            onSelect={() => onStreamerSelect(streamer)}
          />
        ))}
      </div>
    </div>
  );
}