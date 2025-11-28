import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { CheckCircle2, Calendar, Clock, Video, MapPin, Download } from 'lucide-react';

interface BookingConfirmationScreenProps {
  booking: any;
  onNavigate: (screen: string) => void;
}

export function BookingConfirmationScreen({ booking, onNavigate }: BookingConfirmationScreenProps) {
  const handleAddToCalendar = () => {
    // Placeholder: Would generate ICS file or integrate with Google Calendar API
    console.log('Add to Google Calendar:', booking);
    alert('Calendar integration: In a production app, this would add the event to Google Calendar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-haze to-warm-neutral flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-text-primary mb-2">Booking Confirmed!</h2>
          <p className="text-text-secondary">
            Your session has been successfully scheduled
          </p>
        </div>

        {/* Booking Details */}
        <Card className="border-l-4 border-l-success">
          <h3 className="text-text-primary mb-4">Session Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-muted-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-muted-purple" />
              </div>
              <div>
                <p className="text-text-secondary text-sm">Date</p>
                <p className="text-text-primary">
                  {new Date(booking.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-muted-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-muted-purple" />
              </div>
              <div>
                <p className="text-text-secondary text-sm">Time</p>
                <p className="text-text-primary">{booking.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-muted-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                {booking.mode === 'Online' ? (
                  <Video size={20} className="text-muted-purple" />
                ) : (
                  <MapPin size={20} className="text-muted-purple" />
                )}
              </div>
              <div>
                <p className="text-text-secondary text-sm">Mode</p>
                <p className="text-text-primary">{booking.mode}</p>
                {booking.mode === 'Online' && booking.session_link && (
                  <a
                    href={booking.session_link}
                    className="text-muted-purple text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Session Link
                  </a>
                )}
                {booking.mode === 'Offline' && booking.clinic_address && (
                  <p className="text-text-secondary text-sm">{booking.clinic_address}</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-soft-beige">
              <p className="text-text-secondary text-sm mb-1">With</p>
              <p className="text-text-primary">{booking.therapist_name}</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button fullWidth variant="secondary" onClick={handleAddToCalendar}>
            <Download size={20} />
            Add to Google Calendar
          </Button>
          
          <Button fullWidth variant="ghost" onClick={() => onNavigate(`session-${booking.id}`)}>
            View Session Details
          </Button>
        </div>

        {/* Supabase Success Tag */}
        <Card className="bg-success/10 border-success">
          <p className="text-success text-sm text-center">
            ✓ Saved to Supabase 'bookings' table successfully
          </p>
        </Card>

        {/* Email Notification Info */}
        <Card className="bg-lavender-haze/50">
          <p className="text-text-secondary text-sm text-center">
            📧 A confirmation email has been sent to your registered email address
          </p>
        </Card>

        {/* Return to Dashboard */}
        <Button fullWidth onClick={() => onNavigate('dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
