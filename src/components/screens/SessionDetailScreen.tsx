import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ArrowLeft, Calendar, Clock, Video, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import { supabaseDB } from '../../lib/supabase';

interface SessionDetailScreenProps {
  booking: any;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function SessionDetailScreen({ booking, onBack, onNavigate }: SessionDetailScreenProps) {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(booking.status === 'Completed');

  const handleMarkComplete = async () => {
    setLoading(true);
    // Update booking status in Supabase
    await supabaseDB.updateBookingStatus(booking.id, 'Completed');
    setLoading(false);
    setIsCompleted(true);
    setShowCompleteModal(false);
  };

  return (
    <div className="min-h-screen bg-warm-neutral pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-muted-purple to-lavender-haze p-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h2 className="text-white mb-2">Session Details</h2>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm ${
            isCompleted ? 'bg-success/20 text-white' : 'bg-white/20 text-white'
          }`}>
            {isCompleted ? '✓ Completed' : 'Upcoming'}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 space-y-4">
        {/* Therapist Info */}
        <Card>
          <h3 className="text-text-primary mb-3">{booking.therapist_name}</h3>
          <p className="text-text-secondary text-sm">Marriage & Family Therapist</p>
        </Card>

        {/* Date & Time */}
        <Card>
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
          </div>
        </Card>

        {/* Mode & Location */}
        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-muted-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
              {booking.mode === 'Online' ? (
                <Video size={20} className="text-muted-purple" />
              ) : (
                <MapPin size={20} className="text-muted-purple" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-text-secondary text-sm">Mode</p>
              <p className="text-text-primary mb-2">{booking.mode}</p>
              
              {booking.mode === 'Online' && booking.session_link && (
                <a
                  href={booking.session_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted-purple text-white rounded-lg hover:bg-deep-purple transition-colors"
                >
                  <Video size={18} />
                  Join Online Session
                </a>
              )}

              {booking.mode === 'Offline' && booking.clinic_address && (
                <div className="p-3 bg-soft-beige rounded-lg">
                  <p className="text-text-secondary text-sm mb-1">Clinic Address</p>
                  <p className="text-text-primary text-sm">{booking.clinic_address}</p>
                  <button className="text-muted-purple text-sm mt-2 hover:underline">
                    Get Directions →
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Session Notes */}
        {isCompleted && (
          <Card hoverable onClick={() => onNavigate('notes')}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <h4 className="text-text-primary mb-1">Session Notes Available</h4>
                <p className="text-text-secondary text-sm mb-2">
                  Your therapist has added notes and recommendations
                </p>
                <Button variant="ghost" size="sm">
                  View Notes →
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Pre-session Tips */}
        {!isCompleted && (
          <Card className="bg-lavender-haze/30 border-lavender-haze">
            <h4 className="text-text-primary mb-3">Prepare for Your Session</h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-muted-purple">•</span>
                <span>Find a quiet, private space for your session</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-purple">•</span>
                <span>Test your internet connection (for online sessions)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-purple">•</span>
                <span>Have a notebook ready for important points</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-purple">•</span>
                <span>Arrive 5 minutes early</span>
              </li>
            </ul>
          </Card>
        )}

        {/* Actions */}
        {!isCompleted && (
          <Button
            fullWidth
            variant="secondary"
            onClick={() => setShowCompleteModal(true)}
          >
            <CheckCircle2 size={20} />
            Mark as Completed
          </Button>
        )}

        {/* Supabase Info */}
        <Card className="bg-muted-purple/10 border-muted-purple/30">
          <p className="text-text-secondary text-sm">
            💾 <strong>Supabase Integration:</strong> Session details are stored in the
            'bookings' table. Marking as complete updates the status field to 'Completed'.
          </p>
        </Card>
      </div>

      {/* Complete Modal */}
      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title="Mark Session as Completed"
      >
        <div className="space-y-4">
          <p className="text-text-secondary">
            Are you sure you want to mark this session as completed?
          </p>
          <div className="flex gap-3">
            <Button
              fullWidth
              variant="secondary"
              onClick={() => setShowCompleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              loading={loading}
              onClick={handleMarkComplete}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
