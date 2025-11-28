import { Calendar, TrendingUp, FileText, Heart, ArrowRight, Clock } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { BottomNav } from './BottomNav';
import { Screen, User, Booking } from '../App';

interface DashboardProps {
  navigate: (screen: Screen) => void;
  user: User | null;
  bookings: Booking[];
  setSelectedBooking: (booking: Booking) => void;
}

export function Dashboard({ navigate, user, bookings, setSelectedBooking }: DashboardProps) {
  const upcomingBookings = bookings.filter(b => b.status === 'Upcoming');
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <h2 className="text-white mb-2">
          Hi {user?.name || 'there'} 👋
        </h2>
        <p className="text-white text-opacity-90">
          Welcome back to BandhanHeal
        </p>
      </div>

      <div className="px-6 -mt-4">
        <Card className="bg-white shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A892C4] to-[#8B7AA8] flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3>Your Therapy Journey</h3>
              <p className="text-[#6A6A6A]">{completedCount} sessions completed</p>
            </div>
          </div>
          <div className="h-2 bg-[#F4EFEA] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#A892C4] to-[#8B7AA8] rounded-full transition-all"
              style={{ width: `${Math.min((completedCount / 10) * 100, 100)}%` }}
            />
          </div>
          <small className="text-[#6A6A6A] mt-2 block">
            {10 - completedCount > 0 ? `${10 - completedCount} more sessions to reach your first milestone` : 'Milestone achieved! 🎉'}
          </small>
        </Card>
      </div>

      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3>Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card onClick={() => navigate('therapist-directory')} className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center mx-auto mb-3">
              <Calendar className="text-[#A892C4]" size={24} />
            </div>
            <h3 className="mb-1">Book Session</h3>
            <p className="text-[#6A6A6A]">Find a therapist</p>
          </Card>

          <Card onClick={() => navigate('progress')} className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="text-[#A892C4]" size={24} />
            </div>
            <h3 className="mb-1">Progress</h3>
            <p className="text-[#6A6A6A]">View insights</p>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3>Upcoming Sessions</h3>
        </div>

        {upcomingBookings.length === 0 ? (
          <Card className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#F4EFEA] flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-[#A892C4]" size={32} />
            </div>
            <h3 className="mb-2">No Upcoming Sessions</h3>
            <p className="text-[#6A6A6A] mb-4">
              Book your first therapy session to get started
            </p>
            <Button onClick={() => navigate('therapist-directory')}>
              Book Now
            </Button>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {upcomingBookings.map(booking => (
              <Card
                key={booking.id}
                onClick={() => {
                  setSelectedBooking(booking);
                  navigate('session-detail');
                }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F4EFEA] overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-[#CFC9D9] to-[#A892C4]" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{booking.therapistName}</h3>
                  <div className="flex items-center gap-2 text-[#6A6A6A]">
                    <Clock size={14} />
                    <small>{booking.date} at {booking.time}</small>
                  </div>
                  <small className="text-[#A892C4]">{booking.mode}</small>
                </div>
                <ArrowRight size={20} className="text-[#9EA7B2]" />
              </Card>
            ))}
          </div>
        )}

        <Card className="mt-6 bg-gradient-to-br from-[#F9F7FF] to-[#F4EFEA]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <FileText className="text-[#A892C4]" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Personalized Plan</h3>
              <p className="text-[#6A6A6A] mb-3">
                Based on your profile, we recommend focusing on communication and trust-building exercises
              </p>
              <Button variant="secondary" onClick={() => navigate('notes')}>
                View Details
              </Button>
            </div>
          </div>
        </Card>

        <button
          onClick={() => navigate('about')}
          className="w-full text-center py-4 text-[#8B7AA8] mt-4"
        >
          About BandhanHeal
        </button>
      </div>

      <BottomNav active="dashboard" navigate={navigate} />
    </div>
  );
}
