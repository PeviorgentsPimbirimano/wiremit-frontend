import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { mockAds, type AdSlide } from '@/utils/mockData';
import studentHero from '@/assets/student-discount-hero.jpg';
import referralHero from '@/assets/referral-program-hero.jpg';
import mobileHero from '@/assets/mobile-app-hero.jpg';

export const AdCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Map images to ads
  const imageMap: { [key: string]: string } = {
    '1': studentHero,
    '2': referralHero,
    '3': mobileHero
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockAds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockAds.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockAds.length) % mockAds.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <Card className="card-glow overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Slides Container */}
          <div className="relative h-64 overflow-hidden">
            {mockAds.map((ad, index) => (
              <div
                key={ad.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="h-full relative overflow-hidden">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${imageMap[ad.id] || ad.imageUrl})`,
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40" />
                  
                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-center">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-foreground">
                        {ad.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {ad.description}
                      </p>
                      <Button
                        variant="outline"
                        className="btn-hero-outline w-fit"
                        onClick={() => window.open(ad.ctaLink, '_blank')}
                      >
                        <span>{ad.ctaText}</span>
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {mockAds.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary w-6'
                    : 'bg-background/50 hover:bg-background/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <div className="h-1 bg-muted relative overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-100 ease-linear"
              style={{
                width: `${((Date.now() % 5000) / 5000) * 100}%`
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};