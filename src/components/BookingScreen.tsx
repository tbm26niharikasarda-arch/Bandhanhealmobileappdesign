import { useState } from 'react';
import { ArrowLeft, Video, MapPin, Calendar as CalendarIcon, Clock, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Modal } from './Modal';
import { Screen, Therapist, Booking } from '../App';

interface BookingScreenProps {
  navigate: (screen: Screen) => void;
  therapist: Therapist | null;
  addBooking: (booking: Booking) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export function BookingScreen({ navigate, therapist, addBooking, showToast }: BookingScreenProps) {
  const [mode, setMode] = useState<'Online' | 'Offline'>('Online');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  if (!therapist) {
    navigate('therapist-directory');
    return null;
  }

  const dates = [
    '29 Nov, Sat',
    '30 Nov, Sun',
    '1 Dec, Mon',
    '2 Dec, Tue',
    '3 Dec, Wed',
    '4 Dec, Thu'
  ];

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM'
  ];

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      showToast('Please select date and time', 'error');
      return;
    }

    setLoading(true);

    // Simulate Supabase Database Insert to 'bookings' table
    setTimeout(() => {
      const newBooking: Booking = {
        id: Date.now().toString(),
        therapistId: therapist.id,
        therapistName: therapist.name,
        therapistPhoto: therapist.photo,
        date: selectedDate,
        time: selectedTime,
        mode: mode,
        status: 'Upcoming',
        clinicAddress: mode === 'Offline' ? '123 Wellness Center, Mumbai' : undefined,
        sessionLink: mode === 'Online' ? 'https://meet.bandhanheal.com/session-' + Date.now() : undefined
      };

      addBooking(newBooking);
      setLoading(false);
      navigate('booking-confirmation');
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-8 pb-6">
        <button
          onClick={() => navigate('therapist-profile')}
          className="flex items-center gap-2 text-white mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="text-white mb-2">Book Appointment</h1>
        <p className="text-white text-opacity-90">
          with {therapist.name}
        </p>
      </div>

      <div className="px-6 py-6">
        <h3 className="mb-3">Select Mode</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {therapist.online && (
            <button
              onClick={() => setMode('Online')}
              className={`p-4 rounded-2xl transition-all ${
                mode === 'Online'
                  ? 'bg-[#A892C4] text-white'
                  : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
              }`}
            >
              <Video size={24} className="mx-auto mb-2" />
              <span>Online</span>
            </button>
          )}
          {therapist.offline && (
            <button
              onClick={() => setMode('Offline')}
              className={`p-4 rounded-2xl transition-all ${
                mode === 'Offline'
                  ? 'bg-[#A892C4] text-white'
                  : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
              }`}
            >
              <MapPin size={24} className="mx-auto mb-2" />
              <span>In-Person</span>
            </button>
          )}
        </div>

        <h3 className="mb-3">Select Date</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {dates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`p-3 rounded-2xl transition-all text-center ${
                selectedDate === date
                  ? 'bg-[#A892C4] text-white'
                  : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
              }`}
            >
              <CalendarIcon size={20} className="mx-auto mb-1" />
              <small>{date}</small>
            </button>
          ))}
        </div>

        <h3 className="mb-3">Select Time</h3>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-3 rounded-2xl transition-all text-center ${
                selectedTime === time
                  ? 'bg-[#A892C4] text-white'
                  : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
              }`}
            >
              <Clock size={16} className="mx-auto mb-1" />
              <small>{time}</small>
            </button>
          ))}
        </div>

        <Card className="mb-6">
          <h3 className="mb-4">Booking Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#6A6A6A]">Therapist</span>
              <span>{therapist.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6A6A6A]">Mode</span>
              <span>{mode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6A6A6A]">Date</span>
              <span>{selectedDate || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6A6A6A]">Time</span>
              <span>{selectedTime || 'Not selected'}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#E6E2DD]">
              <span>Session Fee</span>
              <span className="text-[#A892C4]">{therapist.fee}</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#F9F7FF] mb-6">
          <p className="text-[#8B7AA8] text-center">
            <strong>Supabase Database:</strong> Booking will be saved to 'bookings' table
          </p>
        </Card>

        <Button onClick={handleConfirmBooking} disabled={loading} fullWidth>
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 size={20} className="animate-spin" />
              Confirming Booking...
            </span>
          ) : (
            'Confirm Booking'
          )}
        </Button>
      </div>

      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Connection Error"
        actions={
          <>
            <Button onClick={() => setShowErrorModal(false)} variant="secondary" fullWidth>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking} fullWidth>
              Try Again
            </Button>
          </>
        }
      >
        <p className="text-center">
          Could not connect to server. Please check your internet connection and try again.
        </p>
      </Modal>
    </div>
  );
}
