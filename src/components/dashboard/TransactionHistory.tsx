import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  formatDate, 
  getStatusBadge, 
  type Transaction 
} from '@/utils/mockData';
import { formatCurrency } from '@/utils/currency';
import { History, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 5;

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleCopyReference = (reference: string) => {
    navigator.clipboard.writeText(reference);
    toast({
      title: "Reference Copied",
      description: `Transaction reference ${reference} copied to clipboard`,
      className: "border-primary/20 bg-card"
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="card-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Transaction History
        </CardTitle>
        <CardDescription>
          View all your recent money transfers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Transaction List */}
          <div className="space-y-3">
            {currentTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-4 rounded-lg border border-border hover:bg-card/50 transition-all duration-300 fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {transaction.country === 'United Kingdom' ? '🇬🇧' : '🇿🇦'}
                      </span>
                      <div>
                        <h4 className="font-semibold">{transaction.recipient}</h4>
                        <p className="text-sm text-muted-foreground">
                          {transaction.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatDate(transaction.date)}</span>
                      <span>•</span>
                      <button
                        onClick={() => handleCopyReference(transaction.reference)}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <span>{transaction.reference}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold text-lg">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusBadge(transaction.status)} capitalize w-fit`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length} transactions
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="w-8 h-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className={`w-8 h-8 p-0 ${
                        page === currentPage ? 'bg-primary text-primary-foreground' : ''
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};