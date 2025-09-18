import React from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAgentKit } from '../hooks/useAgentKit';

export function AgentKitStatus() {
  const { isReady, isInitializing, error } = useAgentKit();

  if (isInitializing) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-md text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Initializing AgentKit...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/10 text-red-400 rounded-md text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>AgentKit Error</span>
      </div>
    );
  }

  if (isReady) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-md text-sm">
        <CheckCircle className="w-4 h-4" />
        <span>Gasless Ready</span>
      </div>
    );
  }

  return null;
}