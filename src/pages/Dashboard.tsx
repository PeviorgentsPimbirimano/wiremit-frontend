import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';
import { getCurrentUser, logout, type User } from '@/utils/auth';
import { SendMoney } from '@/components/dashboard/SendMoney';
import { AdCarousel } from '@/components/dashboard/AdCarousel';
import { TransactionHistory } from '@/components/dashboard/TransactionHistory';
import { mockTransactions, type Transaction } from '@/utils/mockData';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LogOut, User as UserIcon } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setMounted(true);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <UserIcon className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Welcome back,</span>
                <span className="font-medium">{user.name}</span>
              </div>
              
              <ThemeToggle />
              
              <Button
                variant="outline"
                onClick={handleLogout}
                className="btn-hero-outline"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className={`mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            Welcome back, <span className="text-gradient">{user.name}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Send money to your children with confidence and ease
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {/* Send Money Section */}
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '200ms' }}>
            <SendMoney onTransactionComplete={handleNewTransaction} />
          </div>

          {/* Special Offers Section */}
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '400ms' }}>
            <div>
              <h2 className="text-xl font-semibold mb-4">Special Offers</h2>
              <AdCarousel />
            </div>
          </div>
        </div>

        {/* Transaction History - Full Width */}
        <div className={`mt-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '600ms' }}>
          <TransactionHistory transactions={transactions} />
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};