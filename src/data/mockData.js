export const mockStreamers = [
  {
    streamerId: 'ninja',
    name: 'Ninja',
    game: 'Fortnite',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    isLive: true,
    followers: 24000000,
    tokenSymbol: 'NINJA',
    tokenPrice: '2.45',
    priceChange: 5.2,
    creatorTokenAddress: '0x123...',
    socialLinks: {
      twitch: 'https://twitch.tv/ninja',
      twitter: 'https://twitter.com/ninja'
    }
  },
  {
    streamerId: 'shroud',
    name: 'Shroud',
    game: 'Valorant',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face',
    isLive: false,
    followers: 10500000,
    tokenSymbol: 'SHROUD',
    tokenPrice: '1.89',
    priceChange: -2.1,
    creatorTokenAddress: '0x456...',
    socialLinks: {
      twitch: 'https://twitch.tv/shroud',
      twitter: 'https://twitter.com/shroud'
    }
  },
  {
    streamerId: 'pokimane',
    name: 'Pokimane',
    game: 'Among Us',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=100&h=100&fit=crop&crop=face',
    isLive: true,
    followers: 9200000,
    tokenSymbol: 'POKI',
    tokenPrice: '3.21',
    priceChange: 12.8,
    creatorTokenAddress: '0x789...',
    socialLinks: {
      twitch: 'https://twitch.tv/pokimane',
      twitter: 'https://twitter.com/pokimanelol'
    }
  },
  {
    streamerId: 'tfue',
    name: 'Tfue',
    game: 'Apex Legends',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isLive: true,
    followers: 7800000,
    tokenSymbol: 'TFUE',
    tokenPrice: '1.67',
    priceChange: 8.4,
    creatorTokenAddress: '0xabc...',
    socialLinks: {
      twitch: 'https://twitch.tv/tfue',
      twitter: 'https://twitter.com/tfue'
    }
  },
  {
    streamerId: 'xqc',
    name: 'xQc',
    game: 'Variety',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    isLive: false,
    followers: 12100000,
    tokenSymbol: 'XQC',
    tokenPrice: '4.56',
    priceChange: -5.7,
    creatorTokenAddress: '0xdef...',
    socialLinks: {
      twitch: 'https://twitch.tv/xqcow',
      twitter: 'https://twitter.com/xqc'
    }
  },
  {
    streamerId: 'symfuhny',
    name: 'Symfuhny',
    game: 'Call of Duty',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    isLive: true,
    followers: 3200000,
    tokenSymbol: 'SYM',
    tokenPrice: '0.89',
    priceChange: 15.3,
    creatorTokenAddress: '0x321...',
    socialLinks: {
      twitch: 'https://twitch.tv/symfuhny',
      twitter: 'https://twitter.com/symfuhny'
    }
  }
];

export const mockMarkets = [
  {
    marketId: 'market_1',
    streamerId: 'ninja',
    question: 'Will Ninja get a Victory Royale in his next match?',
    options: [
      { text: 'Yes', bets: 450 },
      { text: 'No', bets: 320 }
    ],
    startTime: '2024-01-15T18:00:00Z',
    endTime: '2024-01-15T20:00:00Z',
    status: 'active',
    totalBets: 770,
    totalValue: '1,250'
  },
  {
    marketId: 'market_2',
    streamerId: 'shroud',
    question: 'Will Shroud achieve 20+ kills in his next Valorant ranked match?',
    options: [
      { text: 'Yes', bets: 280 },
      { text: 'No', bets: 520 }
    ],
    startTime: '2024-01-15T19:00:00Z',
    endTime: '2024-01-15T21:00:00Z',
    status: 'active',
    totalBets: 800,
    totalValue: '980'
  },
  {
    marketId: 'market_3',
    streamerId: 'pokimane',
    question: 'Will Pokimane correctly identify the impostor in her first Among Us game?',
    options: [
      { text: 'Yes', bets: 180 },
      { text: 'No', bets: 220 }
    ],
    startTime: '2024-01-15T20:00:00Z',
    endTime: '2024-01-15T22:00:00Z',
    status: 'active',
    totalBets: 400,
    totalValue: '654'
  },
  {
    marketId: 'market_4',
    streamerId: 'tfue',
    question: 'Will Tfue reach Diamond rank by the end of today?',
    options: [
      { text: 'Yes', bets: 340 },
      { text: 'No', bets: 180 }
    ],
    startTime: '2024-01-15T16:00:00Z',
    endTime: '2024-01-16T00:00:00Z',
    status: 'active',
    totalBets: 520,
    totalValue: '892'
  },
  {
    marketId: 'market_5',
    streamerId: 'ninja',
    question: 'Did Ninja place Top 5 in the tournament?',
    options: [
      { text: 'Yes', bets: 650 },
      { text: 'No', bets: 150 }
    ],
    startTime: '2024-01-14T18:00:00Z',
    endTime: '2024-01-14T22:00:00Z',
    status: 'resolved',
    winningOption: 'option1',
    totalBets: 800,
    totalValue: '1,450'
  },
  {
    marketId: 'market_6',
    streamerId: 'xqc',
    question: 'Will xQc react to more than 5 TikToks in this stream?',
    options: [
      { text: 'Yes', bets: 420 },
      { text: 'No', bets: 80 }
    ],
    startTime: '2024-01-14T19:00:00Z',
    endTime: '2024-01-14T23:00:00Z',
    status: 'resolved',
    winningOption: 'option1',
    totalBets: 500,
    totalValue: '756'
  }
];

export const mockUserBets = [
  {
    betId: 'bet_1',
    userId: 'user_123',
    marketId: 'market_1',
    selectedOption: 'Yes',
    amount: 50,
    timestamp: '2024-01-15T18:30:00Z',
    status: 'active'
  },
  {
    betId: 'bet_2',
    userId: 'user_123',
    marketId: 'market_3',
    selectedOption: 'No',
    amount: 25,
    timestamp: '2024-01-15T20:15:00Z',
    status: 'active'
  },
  {
    betId: 'bet_3',
    userId: 'user_123',
    marketId: 'market_5',
    selectedOption: 'Yes',
    amount: 100,
    timestamp: '2024-01-14T18:45:00Z',
    status: 'won',
    payout: 180
  },
  {
    betId: 'bet_4',
    userId: 'user_123',
    marketId: 'market_6',
    selectedOption: 'Yes',
    amount: 75,
    timestamp: '2024-01-14T19:30:00Z',
    status: 'won',
    payout: 135
  }
];