import { ArrowLeft, Video, MapPin, Calendar, Clock, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Modal } from './Modal';
import { Screen, Booking } from '../App';

interface SessionDetailProps {
  navigate: (screen: Screen) => void;
  booking: Booking | null;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export function SessionDetail({ navigate, booking, showToast }: SessionDetailProps) {
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  if (!booking) {
    navigate('dashboard');
    return null;
  }

  const handleJoinSession = () => {
    if (booking.sessionLink) {
      window.open(booking.sessionLink, '_blank');
    }
  };

  const handleMarkComplete = () => {
    setShowCompleteModal(false);
    showToast('Session marked as completed!');
    // Update booking status in Supabase
    navigate('dashboard');
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-8 pb-6">
        <button
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-2 text-white mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-white mb-2">Session Details</h1>
        <p className="text-white text-opacity-90">
          {booking.status === 'Upcoming' ? 'Upcoming Session' : 'Completed Session'}
        </p>
      </div>

      <div className="px-6 py-6">
        <Card className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F4EFEA]">
              <div className="w-full h-full bg-gradient-to-br from-[#CFC9D9] to-[#A892C4]" />
            </div>
            <div>
              <h3 className="mb-1">{booking.therapistName}</h3>
              <p className="text-[#6A6A6A]">Marriage Counselor</p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-full inline-block ${
            booking.status === 'Upcoming' 
              ? 'bg-[#E8F5EE] text-[#7DBB9F]' 
              : 'bg-[#F4EFEA] text-[#8B7AA8]'
          }`}>
            <small>{booking.status}</small>
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="mb-4">Session Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
                <Calendar className="text-[#A892C4]" size={20} />
              </div>
              <div>
                <small className="text-[#6A6A6A]">Date</small>
                <p>{booking.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
                <Clock className="text-[#A892C4]" size={20} />
              </div>
              <div>
                <small className="text-[#6A6A6A]">Time</small>
                <p>{booking.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
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
          </div>
        </Card>

        {booking.mode === 'Online' && booking.sessionLink && (
          <Card className="mb-6 bg-gradient-to-br from-[#F9F7FF] to-[#F4EFEA]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Video className="text-[#A892C4]" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Online Session Link</h3>
                <p className="text-[#6A6A6A] break-all mb-3">{booking.sessionLink}</p>
              </div>
            </div>
            {booking.status === 'Upcoming' && (
              <Button onClick={handleJoinSession} fullWidth>
                <ExternalLink size={20} className="inline mr-2" />
                Join Session
              </Button>
            )}
          </Card>
        )}

        {booking.mode === 'Offline' && booking.clinicAddress && (
          <Card className="mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
                <MapPin className="text-[#A892C4]" size={20} />
              </div>
              <div>
                <h3 className="mb-1">Clinic Address</h3>
                <p className="text-[#6A6A6A]">{booking.clinicAddress}</p>
                <button className="text-[#8B7AA8] mt-2">
                  Get Directions →
                </button>
              </div>
            </div>
          </Card>
        )}

        <Card className="mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
              <FileText className="text-[#A892C4]" size={20} />
            </div>
            <div>
              <h3 className="mb-1">Notes from Therapist</h3>
              <p className="text-[#6A6A6A]">
                {booking.status === 'Completed' 
                  ? 'Great progress on communication skills. Continue practicing active listening techniques discussed in session.'
                  : 'Notes will be available after the session'}
              </p>
            </div>
          </div>
        </Card>

        {booking.status === 'Upcoming' && (
          <>
            <Button onClick={() => setShowCompleteModal(true)} variant="secondary" fullWidth>
              <CheckCircle size={20} className="inline mr-2" />
              Mark as Completed
            </Button>
            
            <Card className="mt-6 bg-[#F9F7FF]">
              <p className="text-[#8B7AA8] text-center">
                <strong>Supabase Update:</strong> Marking complete will update 'bookings' table
              </p>
            </Card>
          </>
        )}
      </div>

      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title="Mark Session Complete?"
        actions={
          <>
            <Button onClick={() => setShowCompleteModal(false)} variant="secondary" fullWidth>
              Cancel
            </Button>
            <Button onClick={handleMarkComplete} fullWidth>
              Confirm
            </Button>
          </>
        }
      >
        <p className="text-center">
          Are you sure you want to mark this session as completed? This action will update the session status in your records.
        </p>
      </Modal>
    </div>
  );
}
