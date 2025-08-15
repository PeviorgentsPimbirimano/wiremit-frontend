export interface ExchangeRates {
  GBP: number;
  ZAR: number;
}

export interface CurrencyConversion {
  originalAmount: number;
  fee: number;
  feePercentage: number;
  amountAfterFee: number;
  exchangeRate: number;
  finalAmount: number;
  currency: string;
  country: string;
}

// Fetch exchange rates from the API
export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    const response = await fetch('https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    // Extract GBP and ZAR rates from nested data structure
    const gbpRate = data?.rates?.GBP || data?.GBP || 0.85; // Fallback rate
    const zarRate = data?.rates?.ZAR || data?.ZAR || 18.5; // Fallback rate
    
    return {
      GBP: gbpRate,
      ZAR: zarRate
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Return fallback rates if API fails
    return {
      GBP: 0.85,
      ZAR: 18.5
    };
  }
};

// Calculate currency conversion with fees
export const calculateConversion = (
  amountUSD: number,
  targetCurrency: 'GBP' | 'ZAR',
  exchangeRates: ExchangeRates
): CurrencyConversion => {
  const feePercentage = targetCurrency === 'GBP' ? 10 : 20; // UK: 10%, SA: 20%
  const exchangeRate = exchangeRates[targetCurrency];
  
  // Calculate fee and amount after fee
  const fee = Math.ceil((amountUSD * feePercentage) / 100);
  const amountAfterFee = amountUSD - fee;
  
  // Convert to target currency and round UP to nearest whole number
  const finalAmount = Math.ceil(amountAfterFee * exchangeRate);
  
  return {
    originalAmount: amountUSD,
    fee,
    feePercentage,
    amountAfterFee,
    exchangeRate,
    finalAmount,
    currency: targetCurrency,
    country: targetCurrency === 'GBP' ? 'United Kingdom' : 'South Africa'
  };
};

// Validate transfer amount
export const validateTransferAmount = (amount: number): { isValid: boolean; message: string } => {
  const minAmount = 10;
  const maxAmount = 2000;
  
  if (amount < minAmount) {
    return { isValid: false, message: `Minimum transfer amount is $${minAmount}` };
  }
  
  if (amount > maxAmount) {
    return { isValid: false, message: `Maximum transfer amount is $${maxAmount}` };
  }
  
  return { isValid: true, message: '' };
};

// Format currency display
export const formatCurrency = (amount: number, currency: string): string => {
  const symbols: { [key: string]: string } = {
    USD: '$',
    GBP: '£',
    ZAR: 'R'
  };
  
  return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
};