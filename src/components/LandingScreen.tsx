import { Heart, Shield, Users } from 'lucide-react';
import { Button } from './Button';
import { Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingScreenProps {
  navigate: (screen: Screen) => void;
}

export function LandingScreen({ navigate }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-md mx-auto w-full">
        <div className="mb-8 relative w-full h-64 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] opacity-20" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1677166132582-cd8717f8370b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjb3VwbGUlMjB5b3VuZ3xlbnwxfHx8fDE3NjQzNTc0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Young Indian couple"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A892C4] to-[#8B7AA8] flex items-center justify-center mb-6">
          <Heart className="text-white" size={32} />
        </div>

        <h1 className="text-center mb-4">
          BandhanHeal
        </h1>

        <h2 className="text-center mb-6 text-[#5A5A5A]">
          Strengthen Your Bond with Professional Marriage Therapy
        </h2>

        <p className="text-center mb-8 text-[#6A6A6A]">
          Expert guidance, compassionate care, and evidence-based practices to help couples build lasting, fulfilling relationships.
        </p>

        <div className="flex flex-col gap-4 w-full mb-8">
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
              <Shield className="text-[#A892C4]" size={24} />
            </div>
            <div>
              <h3 className="mb-1">Confidential & Secure</h3>
              <p className="text-[#6A6A6A]">Your privacy is our priority</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
              <Users className="text-[#A892C4]" size={24} />
            </div>
            <div>
              <h3 className="mb-1">Expert Therapists</h3>
              <p className="text-[#6A6A6A]">Qualified marriage counselors</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button onClick={() => navigate('signup')} fullWidth>
            Get Started
          </Button>
          <Button onClick={() => navigate('login')} variant="secondary" fullWidth>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
