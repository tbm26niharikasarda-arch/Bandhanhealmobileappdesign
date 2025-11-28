import React from 'react';
import { Button } from '../Button';
import { Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function WelcomeScreen({ onGetStarted, onLogin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-haze to-warm-neutral flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-muted-purple rounded-full flex items-center justify-center">
            <Heart className="text-white" size={28} fill="white" />
          </div>
          <h1 className="text-text-primary">BandhanHeal</h1>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-64 rounded-[1.5rem] overflow-hidden shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1635685840914-c8b1868cde87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjb3VwbGUlMjByZWxhdGlvbnNoaXB8ZW58MXx8fHwxNzY0MzU3NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Young Indian couple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lavender-haze/80 to-transparent"></div>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-text-primary">
            Strengthen Your Bond with Professional Marriage Therapy
          </h2>
          <p className="text-text-secondary">
            Expert guidance for couples seeking deeper connection, understanding, and lasting harmony.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-4">
          <Button fullWidth size="lg" onClick={onGetStarted}>
            Get Started
          </Button>
          <Button fullWidth size="lg" variant="secondary" onClick={onLogin}>
            Login
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-text-secondary text-sm pt-4">
          Your journey to a healthier relationship starts here
        </p>
      </div>
    </div>
  );
}
