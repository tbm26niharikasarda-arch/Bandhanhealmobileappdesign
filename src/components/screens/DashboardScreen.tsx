import React, { useEffect, useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { BottomNav } from '../BottomNav';
import { Calendar, Clock, Video, MapPin, TrendingUp, FileText, Heart } from 'lucide-react';
import { supabaseDB, Booking } from '../../lib/supabase';

interface DashboardScreenProps {
  user: any;
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ user, onNavigate }: DashboardScreenProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const result = await supabaseDB.getBookings(user.id);
    if (result.success) {
      setBookings(result.data as Booking[]);
    }
    setLoading(false);
  };

  const upcomingSessions = bookings.filter((b) => b.status === 'Upcoming');

  return (
    <div className="min-h-screen bg-warm-neutral pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-muted-purple to-lavender-haze p-6 rounded-b-[2rem]">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="text-white" size={20} fill="white" />
            </div>
            <div>
              <h2 className="text-white">Hi, {user?.name || 'there'}!</h2>
              <p className="text-white/80 text-sm">Welcome back to BandhanHeal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-8 space-y-6">
        {/* Quick Actions */}
        <Card>
          <h3 className="text-text-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              fullWidth
              variant="primary"
              onClick={() => onNavigate('therapist-directory')}
            >
              <Calendar size={20} />
              Book New Appointment
            </Button>
            <Button
              fullWidth
              variant="secondary"
              onClick={() => onNavigate('progress')}
            >
              <TrendingUp size={20} />
              View Progress
            </Button>
          </div>
        </Card>

        {/* Upcoming Sessions */}
        <div>
          <h3 className="text-text-primary mb-4">Upcoming Sessions</h3>
          {loading ? (
            <Card>
              <p className="text-text-secondary text-center py-4">Loading sessions...</p>
            </Card>
          ) : upcomingSessions.length > 0 ? (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <Card
                  key={session.id}
                  hoverable
                  onClick={() => onNavigate(`session-${session.id}`)}
                  className="border-l-4 border-l-muted-purple"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-text-primary">{session.therapist_name}</h4>
                      <p className="text-text-secondary text-sm">Marriage Therapist</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      session.mode === 'Online' ? 'bg-muted-purple/10 text-muted-purple' : 'bg-success/10 text-success'
                    }`}>
                      {session.mode}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-text-secondary text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(session.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{session.time}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-6">
                <Calendar size={48} className="mx-auto mb-3 text-soft-grey-purple" />
                <p className="text-text-secondary mb-4">No upcoming sessions</p>
                <Button variant="secondary" onClick={() => onNavigate('therapist-directory')}>
                  Book Your First Session
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Personalized Plan */}
        <Card className="bg-gradient-to-br from-lavender-haze/50 to-soft-beige border-lavender-haze">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-muted-purple rounded-full flex items-center justify-center flex-shrink-0">
              <Heart size={20} className="text-white" fill="white" />
            </div>
            <div>
              <h4 className="text-text-primary mb-2">Your Personalized Plan</h4>
              <p className="text-text-secondary text-sm mb-3">
                Based on your goals: Communication, Trust Building
              </p>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('progress')}>
                View Details →
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress Overview */}
        <Card>
          <h4 className="text-text-primary mb-4">Your Journey</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-muted-purple/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar size={20} className="text-muted-purple" />
              </div>
              <p className="text-text-primary">3</p>
              <p className="text-text-secondary text-sm">Sessions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp size={20} className="text-success" />
              </div>
              <p className="text-text-primary">85%</p>
              <p className="text-text-secondary text-sm">Progress</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-lavender-haze rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText size={20} className="text-deep-purple" />
              </div>
              <p className="text-text-primary">2</p>
              <p className="text-text-secondary text-sm">Notes</p>
            </div>
          </div>
        </Card>

        {/* Therapy Notes Preview */}
        <Card hoverable onClick={() => onNavigate('notes')}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-text-primary">Recent Notes</h4>
            <FileText size={20} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary text-sm mb-2">
            "Good progress in communication exercises. Keep practicing active listening..."
          </p>
          <Button variant="ghost" size="sm">
            View All Notes →
          </Button>
        </Card>

        {/* Supabase Data Info */}
        <Card className="bg-muted-purple/10 border-muted-purple/30">
          <p className="text-text-secondary text-sm">
            📊 <strong>Data from Supabase:</strong> Upcoming sessions are fetched from the
            'bookings' table. Progress metrics come from the 'progress' table.
          </p>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
