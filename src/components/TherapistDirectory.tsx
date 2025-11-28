import { useState } from 'react';
import { ArrowLeft, Search, Star, MapPin, Video, Home as HomeIcon, SlidersHorizontal } from 'lucide-react';
import { Card } from './Card';
import { BottomNav } from './BottomNav';
import { Screen, Therapist } from '../App';

interface TherapistDirectoryProps {
  navigate: (screen: Screen) => void;
  setSelectedTherapist: (therapist: Therapist) => void;
}

export function TherapistDirectory({ navigate, setSelectedTherapist }: TherapistDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'online' | 'offline'>('all');

  const therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      photo: 'https://images.unsplash.com/photo-1670223364099-eb3f7738cd93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQyODMwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      specialization: 'Marriage & Couples Therapy',
      rating: 4.9,
      experience: '12 years',
      online: true,
      offline: true,
      fee: '₹2500/session',
      qualifications: ['Ph.D. in Clinical Psychology', 'Certified Marriage Counselor', 'Gottman Method Trained'],
      reviews: [
        { author: 'Anonymous', text: 'Dr. Sharma helped us reconnect and communicate better. Highly recommend!', rating: 5 },
        { author: 'Rahul K.', text: 'Professional and compassionate. Our relationship has improved significantly.', rating: 5 }
      ]
    },
    {
      id: '2',
      name: 'Dr. Arjun Mehta',
      photo: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MzM2MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      specialization: 'Relationship Psychology',
      rating: 4.8,
      experience: '10 years',
      online: true,
      offline: false,
      fee: '₹2000/session',
      qualifications: ['M.Phil. in Psychology', 'Certified EFT Therapist', 'CBT Practitioner'],
      reviews: [
        { author: 'Sneha P.', text: 'Very understanding and provides practical tools. Grateful for his guidance.', rating: 5 },
        { author: 'Anonymous', text: 'Helped us work through tough times. Thank you Dr. Mehta!', rating: 4 }
      ]
    },
    {
      id: '3',
      name: 'Dr. Kavita Reddy',
      photo: 'https://images.unsplash.com/photo-1670223364099-eb3f7738cd93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQyODMwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      specialization: 'Family & Couples Counseling',
      rating: 4.7,
      experience: '8 years',
      online: false,
      offline: true,
      fee: '₹1800/session',
      qualifications: ['M.A. in Counseling Psychology', 'Family Systems Therapy', 'LGBTQ+ Affirmative'],
      reviews: [
        { author: 'Amit S.', text: 'Great listener and non-judgmental. Made us feel safe to open up.', rating: 5 }
      ]
    },
    {
      id: '4',
      name: 'Dr. Rohan Desai',
      photo: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0MzM2MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      specialization: 'Intimacy & Communication',
      rating: 4.9,
      experience: '15 years',
      online: true,
      offline: true,
      fee: '₹3000/session',
      qualifications: ['Ph.D. in Marriage Therapy', 'AASECT Certified', 'EMDR Trained'],
      reviews: [
        { author: 'Pooja M.', text: 'Changed our lives. We feel connected again after years of distance.', rating: 5 }
      ]
    }
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         therapist.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMode = filterMode === 'all' ||
                       (filterMode === 'online' && therapist.online) ||
                       (filterMode === 'offline' && therapist.offline);

    return matchesSearch && matchesMode;
  });

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-8 pb-6">
        <button
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-2 text-white mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="text-white mb-6">Find Your Therapist</h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9EA7B2]" size={20} />
          <input
            type="text"
            placeholder="Search by name or specialization"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filterMode === 'all'
                ? 'bg-[#A892C4] text-white'
                : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
            }`}
          >
            <SlidersHorizontal size={16} className="inline mr-2" />
            All
          </button>
          <button
            onClick={() => setFilterMode('online')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filterMode === 'online'
                ? 'bg-[#A892C4] text-white'
                : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
            }`}
          >
            <Video size={16} className="inline mr-2" />
            Online
          </button>
          <button
            onClick={() => setFilterMode('offline')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filterMode === 'offline'
                ? 'bg-[#A892C4] text-white'
                : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
            }`}
          >
            <HomeIcon size={16} className="inline mr-2" />
            In-Person
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {filteredTherapists.map(therapist => (
            <Card
              key={therapist.id}
              onClick={() => {
                setSelectedTherapist(therapist);
                navigate('therapist-profile');
              }}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F4EFEA]">
                  <div className="w-full h-full bg-gradient-to-br from-[#CFC9D9] to-[#A892C4]" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{therapist.name}</h3>
                  <p className="text-[#6A6A6A] mb-2">{therapist.specialization}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
                      <small>{therapist.rating}</small>
                    </div>
                    <small className="text-[#6A6A6A]">{therapist.experience}</small>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {therapist.online && (
                      <span className="px-3 py-1 rounded-full bg-[#F4EFEA] text-[#8B7AA8]">
                        <Video size={12} className="inline mr-1" />
                        <small>Online</small>
                      </span>
                    )}
                    {therapist.offline && (
                      <span className="px-3 py-1 rounded-full bg-[#F4EFEA] text-[#8B7AA8]">
                        <MapPin size={12} className="inline mr-1" />
                        <small>In-Person</small>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E6E2DD] flex justify-between items-center">
                <span className="text-[#A892C4]">{therapist.fee}</span>
                <button className="text-[#8B7AA8]">
                  View Profile →
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <Card className="text-center py-8">
            <p className="text-[#6A6A6A]">
              No therapists found. Try adjusting your filters.
            </p>
          </Card>
        )}
      </div>

      <BottomNav active="therapist-directory" navigate={navigate} />
    </div>
  );
}
