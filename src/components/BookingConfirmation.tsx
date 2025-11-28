import { CheckCircle, Calendar, Video, MapPin, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Screen, Booking } from '../App';

interface BookingConfirmationProps {
  navigate: (screen: Screen) => void;
  booking: Booking | null;
}

export function BookingConfirmation({ navigate, booking }: BookingConfirmationProps) {
  if (!booking) {
    navigate('dashboard');
    return null;
  }

  const handleAddToCalendar = () => {
    // Mock Google Calendar integration
    alert('Adding to Google Calendar... (Mock functionality)');
  };

  return (
    <div className="min-h-screen px-6 py-12 max-w-md mx-auto flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-[#7DBB9F] flex items-center justify-center mb-6 animate-in zoom-in duration-300">
        <CheckCircle className="text-white" size={40} />
      </div>

      <h1 className="text-center mb-2">
        Booking Confirmed!
      </h1>

      <p className="text-center text-[#6A6A6A] mb-8">
        Your therapy session has been successfully scheduled
      </p>

      <Card className="w-full mb-6 bg-gradient-to-br from-[#F9F7FF] to-[#F4EFEA]">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#E6E2DD]">
          <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F4EFEA]">
            <div className="w-full h-full bg-gradient-to-br from-[#CFC9D9] to-[#A892C4]" />
          </div>
          <div>
            <h3 className="mb-1">{booking.therapistName}</h3>
            <p className="text-[#6A6A6A]">Marriage Counselor</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Calendar className="text-[#A892C4]" size={20} />
            </div>
            <div>
              <small className="text-[#6A6A6A]">Date & Time</small>
              <p>{booking.date} at {booking.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              {booking.mode === 'Online' ? (
                <Video className="text-[#A892C4]" size={20} />
              ) : (
                <MapPin className="text-[#A892C4]" size={20} />
              )}
            </div>
            <div>
              <small className="text-[#6A6A6A]">Mode</small>
              <p>{booking.mode}</p>
            </div>
          </div>

          {booking.mode === 'Online' && booking.sessionLink && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <ExternalLink className="text-[#A892C4]" size={20} />
              </div>
              <div>
                <small className="text-[#6A6A6A]">Session Link</small>
                <p className="text-[#8B7AA8] break-all">{booking.sessionLink}</p>
              </div>
            </div>
          )}

          {booking.mode === 'Offline' && booking.clinicAddress && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <MapPin className="text-[#A892C4]" size={20} />
              </div>
              <div>
                <small className="text-[#6A6A6A]">Clinic Address</small>
                <p>{booking.clinicAddress}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="w-full mb-6 bg-[#E8F5EE] border-[#7DBB9F]">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-[#7DBB9F]" size={24} />
          <div>
            <h3 className="text-[#2A5A3E] mb-1">Saved to Supabase Successfully</h3>
            <p className="text-[#5A8A6E]">Your booking has been stored in the database</p>
          </div>
        </div>
      </Card>

      <div className="w-full flex flex-col gap-3">
        <Button onClick={handleAddToCalendar} fullWidth>
          <Calendar size={20} className="inline mr-2" />
          Add to Google Calendar
        </Button>

        <Button onClick={() => navigate('dashboard')} variant="secondary" fullWidth>
          Go to Dashboard
        </Button>

        <button
          onClick={() => navigate('email-mock')}
          className="text-[#8B7AA8] py-3"
        >
          View Email Notifications →
        </button>
      </div>
    </div>
  );
}
