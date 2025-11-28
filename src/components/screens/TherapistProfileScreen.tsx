import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { ArrowLeft, Star, GraduationCap, Award, Video, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TherapistProfileScreenProps {
  therapist: any;
  onBack: () => void;
  onBookAppointment: (therapist: any) => void;
}

export function TherapistProfileScreen({
  therapist,
  onBack,
  onBookAppointment,
}: TherapistProfileScreenProps) {
  const reviews = [
    {
      id: 1,
      name: 'Rahul & Meera',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'Dr. Mehta helped us navigate through a difficult phase. Her empathetic approach and practical tools made a real difference.',
    },
    {
      id: 2,
      name: 'Amit & Sonal',
      rating: 5,
      date: '1 month ago',
      comment:
        'Professional, caring, and incredibly insightful. We feel more connected than ever.',
    },
  ];

  const availability = [
    { day: 'Mon', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Tue', slots: ['11:00 AM', '3:00 PM'] },
    { day: 'Wed', slots: ['10:00 AM', '12:00 PM', '5:00 PM'] },
    { day: 'Thu', slots: ['2:00 PM', '4:00 PM'] },
    { day: 'Fri', slots: ['10:00 AM', '1:00 PM'] },
  ];

  return (
    <div className="min-h-screen bg-warm-neutral pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-muted-purple to-lavender-haze p-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="flex gap-4 items-start">
            <div className="w-24 h-24 rounded-[1rem] overflow-hidden bg-white/20 flex-shrink-0">
              <ImageWithFallback
                src={therapist.image}
                alt={therapist.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-white">
              <h2 className="mb-1">{therapist.name}</h2>
              <p className="text-white/90 text-sm mb-2">{therapist.specialization}</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={14} fill="white" />
                  <span>{therapist.rating}</span>
                </div>
                <span>•</span>
                <span>{therapist.reviews} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 space-y-4">
        {/* Quick Info */}
        <Card>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted-purple/10 rounded-full flex items-center justify-center">
                <GraduationCap size={20} className="text-muted-purple" />
              </div>
              <div>
                <p className="text-text-secondary text-sm">Experience</p>
                <p className="text-text-primary">{therapist.experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <Award size={20} className="text-success" />
              </div>
              <div>
                <p className="text-text-secondary text-sm">Fee</p>
                <p className="text-text-primary">{therapist.fee}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Modes */}
        <Card>
          <h4 className="text-text-primary mb-3">Available Modes</h4>
          <div className="flex gap-2">
            {therapist.modes.map((mode: string) => (
              <div
                key={mode}
                className="flex items-center gap-2 px-4 py-2 bg-muted-purple/10 text-muted-purple rounded-lg"
              >
                {mode === 'Online' ? <Video size={18} /> : <MapPin size={18} />}
                <span>{mode}</span>
              </div>
            ))}
          </div>
          {therapist.modes.includes('Offline') && (
            <p className="text-text-secondary text-sm mt-2">
              📍 {therapist.location}
            </p>
          )}
        </Card>

        {/* About */}
        <Card>
          <h4 className="text-text-primary mb-3">About</h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            {therapist.name} is a certified marriage and family therapist with over{' '}
            {therapist.experience} of experience helping couples build stronger, healthier
            relationships. Specializing in {therapist.specialization.toLowerCase()}, they use
            evidence-based approaches including Gottman Method and Emotionally Focused Therapy.
          </p>
        </Card>

        {/* Qualifications */}
        <Card>
          <h4 className="text-text-primary mb-3">Qualifications</h4>
          <ul className="space-y-2 text-text-secondary text-sm">
            <li className="flex items-start gap-2">
              <GraduationCap size={16} className="mt-1 flex-shrink-0 text-muted-purple" />
              <span>M.A. Clinical Psychology, Mumbai University</span>
            </li>
            <li className="flex items-start gap-2">
              <GraduationCap size={16} className="mt-1 flex-shrink-0 text-muted-purple" />
              <span>Ph.D. Marriage & Family Therapy</span>
            </li>
            <li className="flex items-start gap-2">
              <Award size={16} className="mt-1 flex-shrink-0 text-muted-purple" />
              <span>Certified Gottman Method Therapist</span>
            </li>
            <li className="flex items-start gap-2">
              <Award size={16} className="mt-1 flex-shrink-0 text-muted-purple" />
              <span>Licensed Clinical Psychologist (RCI)</span>
            </li>
          </ul>
        </Card>

        {/* Availability Preview */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-text-primary">Availability</h4>
            <Calendar size={20} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary text-sm mb-3">
            Next available: <span className="text-text-primary">{therapist.nextAvailable}</span>
          </p>
          <div className="space-y-2">
            {availability.slice(0, 3).map((day) => (
              <div key={day.day} className="flex items-center gap-3 text-sm">
                <span className="text-text-primary w-12">{day.day}</span>
                <div className="flex flex-wrap gap-2">
                  {day.slots.map((slot) => (
                    <span
                      key={slot}
                      className="px-2 py-1 bg-soft-beige text-text-secondary rounded text-xs"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reviews */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-text-primary">Reviews</h4>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-yellow-500" fill="currentColor" />
              <span className="text-text-primary">
                {therapist.rating} ({therapist.reviews})
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="pb-4 border-b border-soft-beige last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-primary">{review.name}</span>
                  <span className="text-text-secondary text-sm">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="sticky bottom-0 bg-warm-neutral pt-4 pb-6">
          <Button fullWidth size="lg" onClick={() => onBookAppointment(therapist)}>
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
