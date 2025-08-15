import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  fetchExchangeRates, 
  calculateConversion, 
  validateTransferAmount, 
  formatCurrency,
  type ExchangeRates,
  type CurrencyConversion 
} from '@/utils/currency';
import { createTransaction, type Transaction } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface SendMoneyProps {
  onTransactionComplete: (transaction: Transaction) => void;
}

export const SendMoney = ({ onTransactionComplete }: SendMoneyProps) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'GBP' | 'ZAR' | ''>('');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [conversion, setConversion] = useState<CurrencyConversion | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [recipientError, setRecipientError] = useState('');

  // Fetch exchange rates on component mount
  useEffect(() => {
    const loadExchangeRates = async () => {
      setIsLoadingRates(true);
      try {
        const rates = await fetchExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        toast({
          title: "Exchange Rate Error",
          description: "Using fallback rates. Some calculations may not be current.",
          variant: "destructive"
        });
      } finally {
        setIsLoadingRates(false);
      }
    };

    loadExchangeRates();
  }, [toast]);

  // Calculate conversion when amount or country changes
  useEffect(() => {
    if (amount && selectedCountry && exchangeRates) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount) && numAmount > 0) {
        const validation = validateTransferAmount(numAmount);
        if (validation.isValid) {
          const calc = calculateConversion(numAmount, selectedCountry, exchangeRates);
          setConversion(calc);
          setAmountError('');
        } else {
          setAmountError(validation.message);
          setConversion(null);
        }
      } else {
        setConversion(null);
        setAmountError('');
      }
    } else {
      setConversion(null);
      setAmountError('');
    }
  }, [amount, selectedCountry, exchangeRates]);

  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal points
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    // Prevent multiple decimal points
    const parts = sanitizedValue.split('.');
    if (parts.length > 2) {
      return;
    }
    setAmount(sanitizedValue);
  };

  const handleSendMoney = async () => {
    if (!conversion || amountError || !recipientId.trim()) {
      if (!recipientId.trim()) {
        setRecipientError('Recipient ID is required');
      }
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create new transaction
    const newTransaction = createTransaction({
      amount: conversion.finalAmount,
      currency: conversion.currency as 'GBP' | 'ZAR',
      country: conversion.country,
      originalAmount: conversion.originalAmount
    });
    
    // Add to transaction history
    onTransactionComplete(newTransaction);
    
    toast({
      title: "Transfer Initiated Successfully!",
      description: `${formatCurrency(conversion.finalAmount, conversion.currency)} will be sent to ${conversion.country}`,
      className: "border-primary/20 bg-card"
    });
    
    // Reset form
    setAmount('');
    setRecipientId('');
    setSelectedCountry('');
    setConversion(null);
    setRecipientError('');
    setIsProcessing(false);
  };

  return (
    <Card className="card-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Send Money
        </CardTitle>
        <CardDescription>
          Send pocket money to your children studying abroad
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amount Input */}
        <div>
          <Label htmlFor="amount">Amount (USD)</Label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="amount"
              type="text"
              placeholder="0.00"
              className="input-glow pl-8"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
            />
          </div>
          {amountError && (
            <p className="text-destructive text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {amountError}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Min: $10 • Max: $2,000
          </p>
        </div>

        {/* Recipient ID Input */}
        <div>
          <Label htmlFor="recipientId">Recipient ID</Label>
          <Input
            id="recipientId"
            type="text"
            placeholder="Enter recipient ID"
            className="input-glow mt-2"
            value={recipientId}
            onChange={(e) => {
              setRecipientId(e.target.value);
              if (recipientError) setRecipientError('');
            }}
          />
          {recipientError && (
            <p className="text-destructive text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {recipientError}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Enter the unique ID of your recipient
          </p>
        </div>

        {/* Country Selection */}
        <div>
          <Label htmlFor="country">Destination Country</Label>
          <Select value={selectedCountry} onValueChange={(value) => setSelectedCountry(value as 'GBP' | 'ZAR' | '')}>
            <SelectTrigger className="input-glow mt-2">
              <SelectValue placeholder="Select destination country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GBP">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇬🇧</span>
                  <div>
                    <div>United Kingdom (GBP)</div>
                    <div className="text-sm text-muted-foreground">10% transfer fee</div>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="ZAR">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇿🇦</span>
                  <div>
                    <div>South Africa (ZAR)</div>
                    <div className="text-sm text-muted-foreground">20% transfer fee</div>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Exchange Rate Info */}
        {isLoadingRates && (
          <Alert>
            <LoadingSpinner size="sm" />
            <AlertDescription>Loading current exchange rates...</AlertDescription>
          </Alert>
        )}

        {exchangeRates && selectedCountry && (
          <Alert>
            <AlertDescription>
              Current rate: 1 USD ≈ {exchangeRates[selectedCountry].toFixed(2)} {selectedCountry}
            </AlertDescription>
          </Alert>
        )}

        {/* Conversion Breakdown */}
        {conversion && (
          <div className="card-glow p-4 space-y-3 fade-in">
            <h4 className="font-semibold text-primary">Transfer Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Amount to send:</span>
                <span className="font-medium">{formatCurrency(conversion.originalAmount, 'USD')}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Transfer fee ({conversion.feePercentage}%):</span>
                <span>-{formatCurrency(conversion.fee, 'USD')}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount after fee:</span>
                <span>{formatCurrency(conversion.amountAfterFee, 'USD')}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Exchange rate:</span>
                <span>1 USD = {conversion.exchangeRate.toFixed(4)} {conversion.currency}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Recipient gets:</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(conversion.finalAmount, conversion.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Send Button */}
        <Button
          onClick={handleSendMoney}
          disabled={!conversion || !!amountError || !!recipientError || !recipientId.trim() || isProcessing}
          className="w-full btn-hero py-3"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              Processing Transfer...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Send Money</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>

        {conversion && !amountError && (
          <div className="text-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Transfer will arrive within 2-4 business hours
          </div>
        )}
      </CardContent>
    </Card>
  );
};