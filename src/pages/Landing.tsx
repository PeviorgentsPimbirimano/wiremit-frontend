import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';
import { Shield, Zap, DollarSign, Star } from 'lucide-react';

export const Landing = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: 'Secure Transfers',
      description: 'Bank-grade security with encrypted transactions and fraud protection for peace of mind.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Send money in minutes, not days. Your children get their pocket money when they need it.'
    },
    {
      icon: DollarSign,
      title: 'Low Fees',
      description: 'Transparent pricing with competitive rates. No hidden charges, no surprises.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-50 bg-card/50 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-hero">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-background to-card">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Send Pocket Money
                <br />
                <span className="text-gradient">with Ease</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                The trusted platform for Zimbabwean parents to send secure, fast money transfers 
                to their children studying in the UK and South Africa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link to="/signup">
                  <Button size="lg" className="btn-hero text-lg px-8 py-4">
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="btn-hero-outline text-lg px-8 py-4">
                    I Have an Account
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <span>10,000+ Happy Parents</span>
                <div className="w-px h-4 bg-border"></div>
                <span>Bank-Grade Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Parents Choose Wiremit</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Supporting your child's education abroad with reliable, secure money transfers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.title}
                  className={`card-glow p-8 text-center group transition-all duration-500 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <div className="relative bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-card to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Sending Money?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of parents who trust Wiremit for their international money transfers.
            Your child's financial support is just a few clicks away.
          </p>
          <Link to="/signup">
            <Button size="lg" className="btn-hero text-lg px-12 py-4">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};