import { Banknote } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm animate-pulse-glow"></div>
        <div className="relative bg-primary rounded-full p-2">
          <Banknote className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      {showText && (
        <span className="text-2xl font-bold text-gradient">
          Wiremit
        </span>
      )}
    </div>
  );
};