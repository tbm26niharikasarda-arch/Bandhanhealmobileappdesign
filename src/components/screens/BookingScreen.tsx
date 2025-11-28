import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { ArrowLeft, Video, MapPin, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { supabaseDB } from '../../lib/supabase';

interface BookingScreenProps {
  therapist: any;
  user: any;
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export function BookingScreen({ therapist, user, onBack, onBookingComplete }: BookingScreenProps) {
  const [mode, setMode] = useState<'Online' | 'Offline'>('Online');
  const [selectedDate, setSelectedDate] = useState('2025-12-05');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [loading, setLoading] = useState(false);

  const dates = [
    { date: '2025-12-02', day: 'Mon', dayNum: '2' },
    { date: '2025-12-03', day: 'Tue', dayNum: '3' },
    { date: '2025-12-04', day: 'Wed', dayNum: '4' },
    { date: '2025-12-05', day: 'Thu', dayNum: '5' },
    { date: '2025-12-06', day: 'Fri', dayNum: '6' },
  ];

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  const handleConfirmBooking = async () => {
    setLoading(true);

    // Save booking to Supabase
    const bookingData = {
      user_id: user.id,
      therapist_id: therapist.id,
      therapist_name: therapist.name,
      date: selectedDate,
      time: selectedTime,
      mode: mode,
      session_link: mode === 'Online' ? 'https://meet.google.com/xyz-abcd-efg' : undefined,
      clinic_address: mode === 'Offline' ? therapist.location : undefined,
    };

    const result = await supabaseDB.createBooking(bookingData);
    setLoading(false);

    if (result.success) {
      onBookingComplete({ ...bookingData, id: result.data.id });
    }
  };

  const totalFee = parseInt(therapist.fee.replace(/[^0-9]/g, ''));

  return (
    <div className="min-h-screen bg-warm-neutral pb-8">
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
          <h2 className="text-text-primary">Book Appointment</h2>
          <p className="text-text-secondary text-sm">with {therapist.name}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Mode Selection */}
        <Card>
          <h4 className="text-text-primary mb-3">Select Mode</h4>
          <div className="grid grid-cols-2 gap-3">
            {therapist.modes.includes('Online') && (
              <button
                onClick={() => setMode('Online')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  mode === 'Online'
                    ? 'border-muted-purple bg-muted-purple/10'
                    : 'border-soft-grey-purple hover:border-lavender-haze'
                }`}
              >
                <Video
                  size={24}
                  className={`mx-auto mb-2 ${mode === 'Online' ? 'text-muted-purple' : 'text-text-secondary'}`}
                />
                <p className={mode === 'Online' ? 'text-muted-purple' : 'text-text-secondary'}>
                  Online
                </p>
              </button>
            )}
            {therapist.modes.includes('Offline') && (
              <button
                onClick={() => setMode('Offline')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  mode === 'Offline'
                    ? 'border-muted-purple bg-muted-purple/10'
                    : 'border-soft-grey-purple hover:border-lavender-haze'
                }`}
              >
                <MapPin
                  size={24}
                  className={`mx-auto mb-2 ${mode === 'Offline' ? 'text-muted-purple' : 'text-text-secondary'}`}
                />
                <p className={mode === 'Offline' ? 'text-muted-purple' : 'text-text-secondary'}>
                  In-Person
                </p>
              </button>
            )}
          </div>
          {mode === 'Offline' && (
            <p className="text-text-secondary text-sm mt-3">
              📍 {therapist.location}
            </p>
          )}
        </Card>

        {/* Date Selection */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon size={20} className="text-text-secondary" />
            <h4 className="text-text-primary">Select Date</h4>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dates.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex flex-col items-center px-4 py-3 rounded-lg border-2 min-w-[70px] transition-all ${
                  selectedDate === d.date
                    ? 'border-muted-purple bg-muted-purple/10'
                    : 'border-soft-grey-purple hover:border-lavender-haze'
                }`}
              >
                <span
                  className={`text-sm mb-1 ${selectedDate === d.date ? 'text-muted-purple' : 'text-text-secondary'}`}
                >
                  {d.day}
                </span>
                <span
                  className={`text-xl ${selectedDate === d.date ? 'text-muted-purple' : 'text-text-primary'}`}
                >
                  {d.dayNum}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Time Selection */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={20} className="text-text-secondary" />
            <h4 className="text-text-primary">Select Time</h4>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-2 rounded-lg border-2 transition-all text-sm ${
                  selectedTime === time
                    ? 'border-muted-purple bg-muted-purple/10 text-muted-purple'
                    : 'border-soft-grey-purple hover:border-lavender-haze text-text-secondary'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="border-l-4 border-l-muted-purple">
          <h4 className="text-text-primary mb-4">Booking Summary</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Therapist</span>
              <span className="text-text-primary">{therapist.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Mode</span>
              <span className="text-text-primary">{mode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Date</span>
              <span className="text-text-primary">
                {new Date(selectedDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Time</span>
              <span className="text-text-primary">{selectedTime}</span>
            </div>
            <div className="border-t border-soft-beige pt-3 flex justify-between">
              <span className="text-text-primary">Total Fee</span>
              <span className="text-text-primary">{therapist.fee}</span>
            </div>
          </div>
        </Card>

        {/* Supabase Info */}
        <Card className="bg-muted-purple/10 border-muted-purple/30">
          <p className="text-text-secondary text-sm">
            💾 <strong>Supabase Integration:</strong> Clicking "Confirm Booking" will save this
            booking to the 'bookings' table with status: 'Upcoming'.
          </p>
        </Card>

        {/* Confirm Button */}
        <Button fullWidth size="lg" loading={loading} onClick={handleConfirmBooking}>
          Confirm Booking
        </Button>

        <p className="text-text-secondary text-xs text-center">
          You will receive a confirmation email and calendar invite
        </p>
      </div>
    </div>
  );
}
