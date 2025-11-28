import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { BottomNav } from '../BottomNav';
import { Chip } from '../Chip';
import { ArrowLeft, Star, Video, MapPin, Filter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TherapistDirectoryScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

const therapists = [
  {
    id: '1',
    name: 'Dr. Anjali Mehta',
    specialization: 'Marriage & Family Therapy',
    experience: '12 years',
    rating: 4.9,
    reviews: 156,
    fee: '₹2,000',
    modes: ['Online', 'Offline'],
    location: 'Mumbai, Maharashtra',
    nextAvailable: '2025-12-02',
    image: 'https://images.unsplash.com/photo-1670223364099-eb3f7738cd93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQyODMwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    specialization: 'Couples Counseling',
    experience: '15 years',
    rating: 4.8,
    reviews: 203,
    fee: '₹2,500',
    modes: ['Online', 'Offline'],
    location: 'Delhi NCR',
    nextAvailable: '2025-12-01',
    image: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MzM2MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '3',
    name: 'Dr. Priya Sharma',
    specialization: 'Relationship Psychology',
    experience: '10 years',
    rating: 4.9,
    reviews: 189,
    fee: '₹1,800',
    modes: ['Online'],
    location: 'Bangalore, Karnataka',
    nextAvailable: '2025-12-03',
    image: 'https://images.unsplash.com/photo-1670223364099-eb3f7738cd93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQyODMwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '4',
    name: 'Dr. Arjun Patel',
    specialization: 'Pre-marital Counseling',
    experience: '8 years',
    rating: 4.7,
    reviews: 142,
    fee: '₹1,500',
    modes: ['Online', 'Offline'],
    location: 'Ahmedabad, Gujarat',
    nextAvailable: '2025-12-04',
    image: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MzM2MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function TherapistDirectoryScreen({ onNavigate, onBack }: TherapistDirectoryScreenProps) {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  const modes = ['Online', 'Offline'];
  const specialties = [
    'Marriage Therapy',
    'Couples Counseling',
    'Pre-marital',
    'Relationship Psychology',
  ];

  const filteredTherapists = therapists.filter((t) => {
    if (selectedMode && !t.modes.includes(selectedMode)) return false;
    if (selectedSpecialty && !t.specialization.includes(selectedSpecialty)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-warm-neutral pb-24">
      {/* Header */}
      <div className="bg-white border-b border-soft-beige sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-3"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h2 className="text-text-primary">Find Your Therapist</h2>
          <p className="text-text-secondary text-sm">Browse expert therapists for your journey</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Filters */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-text-secondary" />
            <h4 className="text-text-primary">Filters</h4>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-text-primary text-sm mb-2">Mode</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="All"
                  selected={!selectedMode}
                  onToggle={() => setSelectedMode('')}
                />
                {modes.map((mode) => (
                  <Chip
                    key={mode}
                    label={mode}
                    selected={selectedMode === mode}
                    onToggle={() => setSelectedMode(selectedMode === mode ? '' : mode)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-text-primary text-sm mb-2">Specialization</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="All"
                  selected={!selectedSpecialty}
                  onToggle={() => setSelectedSpecialty('')}
                />
                {specialties.map((specialty) => (
                  <Chip
                    key={specialty}
                    label={specialty}
                    size="sm"
                    selected={selectedSpecialty === specialty}
                    onToggle={() =>
                      setSelectedSpecialty(selectedSpecialty === specialty ? '' : specialty)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Therapist List */}
        <div>
          <p className="text-text-secondary text-sm mb-3">
            {filteredTherapists.length} therapists available
          </p>

          <div className="space-y-4">
            {filteredTherapists.map((therapist) => (
              <Card
                key={therapist.id}
                hoverable
                onClick={() => onNavigate('therapist-profile', therapist)}
              >
                <div className="flex gap-4">
                  {/* Therapist Photo */}
                  <div className="w-20 h-20 rounded-[0.75rem] overflow-hidden bg-soft-beige flex-shrink-0">
                    <ImageWithFallback
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-text-primary mb-1">{therapist.name}</h4>
                    <p className="text-text-secondary text-sm mb-2">
                      {therapist.specialization}
                    </p>

                    {/* Rating & Experience */}
                    <div className="flex items-center gap-3 text-sm text-text-secondary mb-2">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                        <span>{therapist.rating}</span>
                        <span>({therapist.reviews})</span>
                      </div>
                      <span>•</span>
                      <span>{therapist.experience}</span>
                    </div>

                    {/* Modes & Location */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {therapist.modes.map((mode) => (
                        <div
                          key={mode}
                          className="flex items-center gap-1 px-2 py-1 bg-muted-purple/10 text-muted-purple rounded text-xs"
                        >
                          {mode === 'Online' ? (
                            <Video size={12} />
                          ) : (
                            <MapPin size={12} />
                          )}
                          {mode}
                        </div>
                      ))}
                    </div>

                    {/* Fee */}
                    <p className="text-text-primary">
                      {therapist.fee} <span className="text-text-secondary text-sm">per session</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav active="book" onNavigate={onNavigate} />
    </div>
  );
}
