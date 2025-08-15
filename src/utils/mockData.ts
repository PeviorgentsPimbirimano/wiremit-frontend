export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  recipient: string;
  country: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export interface AdSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

// Mock transaction history
// Helper function to create new transactions
export const createTransaction = (data: {
  amount: number;
  currency: 'GBP' | 'ZAR';
  country: string;
  originalAmount: number;
}): Transaction => {
  const recipients = ['Alice Johnson', 'Michael Smith', 'Sarah Williams', 'David Brown', 'Emma Davis'];
  const randomRecipient = recipients[Math.floor(Math.random() * recipients.length)];
  
  return {
    id: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
    recipient: randomRecipient,
    amount: data.amount,
    currency: data.currency,
    country: data.country,
    date: new Date().toISOString(),
    status: 'completed' as const,
    reference: `REF${Date.now().toString().slice(-6)}`
  };
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15T10:30:00Z',
    amount: 850,
    currency: 'GBP',
    recipient: 'Sarah Mukamuri',
    country: 'United Kingdom',
    status: 'completed',
    reference: 'WM2024011501'
  },
  {
    id: '2',
    date: '2024-01-12T14:22:00Z',
    amount: 12500,
    currency: 'ZAR',
    recipient: 'David Chikwanha',
    country: 'South Africa',
    status: 'completed',
    reference: 'WM2024011202'
  },
  {
    id: '3',
    date: '2024-01-08T09:15:00Z',
    amount: 650,
    currency: 'GBP',
    recipient: 'Grace Mpofu',
    country: 'United Kingdom',
    status: 'completed',
    reference: 'WM2024010803'
  },
  {
    id: '4',
    date: '2024-01-05T16:45:00Z',
    amount: 8900,
    currency: 'ZAR',
    recipient: 'Takudzwa Ncube',
    country: 'South Africa',
    status: 'completed',
    reference: 'WM2024010504'
  },
  {
    id: '5',
    date: '2024-01-03T11:20:00Z',
    amount: 750,
    currency: 'GBP',
    recipient: 'Tendai Moyo',
    country: 'United Kingdom',
    status: 'completed',
    reference: 'WM2024010305'
  },
  {
    id: '6',
    date: '2023-12-28T13:33:00Z',
    amount: 11200,
    currency: 'ZAR',
    recipient: 'Chipo Mazvimbakupa',
    country: 'South Africa',
    status: 'completed',
    reference: 'WM2023122806'
  },
  {
    id: '7',
    date: '2023-12-25T08:10:00Z',
    amount: 950,
    currency: 'GBP',
    recipient: 'Michael Sibanda',
    country: 'United Kingdom',
    status: 'completed',
    reference: 'WM2023122507'
  },
  {
    id: '8',
    date: '2023-12-22T15:55:00Z',
    amount: 7800,
    currency: 'ZAR',
    recipient: 'Promise Mutasa',
    country: 'South Africa',
    status: 'completed',
    reference: 'WM2023122208'
  },
  {
    id: '9',
    date: '2023-12-20T12:40:00Z',
    amount: 680,
    currency: 'GBP',
    recipient: 'Rutendo Zimunya',
    country: 'United Kingdom',
    status: 'pending',
    reference: 'WM2023122009'
  },
  {
    id: '10',
    date: '2023-12-18T17:25:00Z',
    amount: 9500,
    currency: 'ZAR',
    recipient: 'Blessing Madzivire',
    country: 'South Africa',
    status: 'completed',
    reference: 'WM2023121810'
  },
  {
    id: '11',
    date: '2023-12-15T10:15:00Z',
    amount: 820,
    currency: 'GBP',
    recipient: 'Farai Gumbo',
    country: 'United Kingdom',
    status: 'completed',
    reference: 'WM2023121511'
  },
  {
    id: '12',
    date: '2023-12-12T14:30:00Z',
    amount: 6700,
    currency: 'ZAR',
    recipient: 'Natasha Chinomona',
    country: 'South Africa',
    status: 'completed',
    reference: 'WM2023121212'
  },
  {
    id: '13',
    date: '2023-12-10T09:50:00Z',
    amount: 710,
    currency: 'GBP',
    recipient: 'Tinashe Makoni',
    country: 'United Kingdom',
    status: 'completed',
    reference: 'WM2023121013'
  },
  {
    id: '14',
    date: '2023-12-08T16:12:00Z',
    amount: 8300,
    currency: 'ZAR',
    recipient: 'Vimbai Chakanyuka',
    country: 'South Africa',
    status: 'failed',
    reference: 'WM2023120814'
  },
  {
    id: '15',
    date: '2023-12-05T11:35:00Z',
    amount: 890,
    currency: 'GBP',
    recipient: 'Tapiwanashe Muza',
    country: 'United Kingdom',
    status: 'completed',
    reference: 'WM2023120515'
  }
];

// Mock ad slides
export const mockAds: AdSlide[] = [
  {
    id: '1',
    title: 'Student Discounts Available',
    description: 'Get 20% off your next transfer when sending to university cities. Perfect for those end-of-term expenses!',
    imageUrl: 'student-discount-hero.jpg',
    ctaText: 'Learn More',
    ctaLink: '#'
  },
  {
    id: '2',
    title: 'Refer a Friend Program',
    description: 'Know other parents sending money abroad? Refer them and both of you get $10 credit on your next transfer.',
    imageUrl: 'referral-program-hero.jpg',
    ctaText: 'Start Referring',
    ctaLink: '#'
  },
  {
    id: '3',
    title: 'Mobile App Coming Soon',
    description: 'Send money on the go with our upcoming mobile app. Get notified when it launches for early access!',
    imageUrl: 'mobile-app-hero.jpg',
    ctaText: 'Get Notified',
    ctaLink: '#'
  }
];

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get status color
export const getStatusColor = (status: Transaction['status']): string => {
  switch (status) {
    case 'completed':
      return 'text-primary';
    case 'pending':
      return 'text-warning';
    case 'failed':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
};

// Get status badge classes
export const getStatusBadge = (status: Transaction['status']): string => {
  switch (status) {
    case 'completed':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'pending':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'failed':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};