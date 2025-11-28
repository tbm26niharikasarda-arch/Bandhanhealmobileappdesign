import { useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { ProfileSetup } from './components/ProfileSetup';
import { Dashboard } from './components/Dashboard';
import { TherapistDirectory } from './components/TherapistDirectory';
import { TherapistProfile } from './components/TherapistProfile';
import { BookingScreen } from './components/BookingScreen';
import { BookingConfirmation } from './components/BookingConfirmation';
import { SessionDetail } from './components/SessionDetail';
import { ProgressPage } from './components/ProgressPage';
import { NotesPage } from './components/NotesPage';
import { SettingsPage } from './components/SettingsPage';
import { AboutPage } from './components/AboutPage';
import { EmailNotificationMock } from './components/EmailNotificationMock';
import { Toast } from './components/Toast';

export type Screen = 
  | 'landing'
  | 'login'
  | 'signup'
  | 'profile-setup'
  | 'dashboard'
  | 'therapist-directory'
  | 'therapist-profile'
  | 'booking'
  | 'booking-confirmation'
  | 'session-detail'
  | 'progress'
  | 'notes'
  | 'settings'
  | 'about'
  | 'email-mock';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relationshipStatus?: string;
  partnerName?: string;
  issues?: string[];
  preferredMode?: string;
  budget?: string;
  location?: string;
}

export interface Therapist {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  rating: number;
  experience: string;
  online: boolean;
  offline: boolean;
  fee: string;
  qualifications: string[];
  reviews: { author: string; text: string; rating: number }[];
}

export interface Booking {
  id: string;
  therapistId: string;
  therapistName: string;
  therapistPhoto: string;
  date: string;
  time: string;
  mode: 'Online' | 'Offline';
  status: 'Upcoming' | 'Completed';
  clinicAddress?: string;
  sessionLink?: string;
}

export interface AppState {
  currentScreen: Screen;
  user: User | null;
  selectedTherapist: Therapist | null;
  selectedBooking: Booking | null;
  bookings: Booking[];
}

function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'landing',
    user: null,
    selectedTherapist: null,
    selectedBooking: null,
    bookings: []
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const navigate = (screen: Screen) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const setUser = (user: User | null) => {
    setState(prev => ({ ...prev, user }));
  };

  const setSelectedTherapist = (therapist: Therapist | null) => {
    setState(prev => ({ ...prev, selectedTherapist: therapist }));
  };

  const setSelectedBooking = (booking: Booking | null) => {
    setState(prev => ({ ...prev, selectedBooking: booking }));
  };

  const addBooking = (booking: Booking) => {
    setState(prev => ({ ...prev, bookings: [...prev.bookings, booking] }));
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const logout = () => {
    setState({
      currentScreen: 'login',
      user: null,
      selectedTherapist: null,
      selectedBooking: null,
      bookings: []
    });
    showToast('Logged out successfully');
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'landing':
        return <LandingScreen navigate={navigate} />;
      case 'login':
        return <LoginScreen navigate={navigate} setUser={setUser} showToast={showToast} />;
      case 'signup':
        return <SignUpScreen navigate={navigate} setUser={setUser} showToast={showToast} />;
      case 'profile-setup':
        return <ProfileSetup navigate={navigate} user={state.user} setUser={setUser} showToast={showToast} />;
      case 'dashboard':
        return <Dashboard navigate={navigate} user={state.user} bookings={state.bookings} setSelectedBooking={setSelectedBooking} />;
      case 'therapist-directory':
        return <TherapistDirectory navigate={navigate} setSelectedTherapist={setSelectedTherapist} />;
      case 'therapist-profile':
        return <TherapistProfile navigate={navigate} therapist={state.selectedTherapist} />;
      case 'booking':
        return <BookingScreen navigate={navigate} therapist={state.selectedTherapist} addBooking={addBooking} showToast={showToast} />;
      case 'booking-confirmation':
        return <BookingConfirmation navigate={navigate} booking={state.bookings[state.bookings.length - 1]} />;
      case 'session-detail':
        return <SessionDetail navigate={navigate} booking={state.selectedBooking} showToast={showToast} />;
      case 'progress':
        return <ProgressPage navigate={navigate} user={state.user} />;
      case 'notes':
        return <NotesPage navigate={navigate} />;
      case 'settings':
        return <SettingsPage navigate={navigate} user={state.user} setUser={setUser} logout={logout} showToast={showToast} />;
      case 'about':
        return <AboutPage navigate={navigate} />;
      case 'email-mock':
        return <EmailNotificationMock navigate={navigate} />;
      default:
        return <LandingScreen navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA]">
      {renderScreen()}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
