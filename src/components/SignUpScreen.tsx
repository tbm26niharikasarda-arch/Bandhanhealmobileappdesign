import { useState } from 'react';
import { ArrowLeft, Loader2, Mail, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Modal } from './Modal';
import { Screen, User } from '../App';

interface SignUpScreenProps {
  navigate: (screen: Screen) => void;
  setUser: (user: User) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export function SignUpScreen({ navigate, setUser, showToast }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [sendReminders, setSendReminders] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSignUp = async () => {
    setError('');

    if (!name || !email || !password || !relationshipStatus) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Simulate Supabase Auth SignUp
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        relationshipStatus: relationshipStatus
      };
      
      setUser(newUser);
      setLoading(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      const mockUser: User = {
        id: Date.now().toString(),
        name: 'Google User',
        email: 'google@example.com',
        relationshipStatus: 'Married'
      };
      
      setUser(mockUser);
      setLoading(false);
      showToast('Account created with Google!');
      navigate('profile-setup');
    }, 1500);
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-md mx-auto w-full pb-20">
      <button
        onClick={() => navigate('landing')}
        className="flex items-center gap-2 text-[#8B7AA8] mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <h1 className="mb-2">Create Account</h1>
      <p className="mb-8 text-[#6A6A6A]">
        Start your journey towards a stronger relationship
      </p>

      <div className="flex flex-col gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={setName}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={setEmail}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          value={password}
          onChange={setPassword}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-[#4A4A4A]">
            Relationship Status <span className="text-[#D88B8B]">*</span>
          </label>
          <select
            value={relationshipStatus}
            onChange={(e) => setRelationshipStatus(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-white border border-[#E6E2DD] focus:border-[#A892C4] focus:outline-none"
          >
            <option value="">Select status</option>
            <option value="Married">Married</option>
            <option value="Engaged">Engaged</option>
            <option value="Dating">Dating</option>
            <option value="In a Relationship">In a Relationship</option>
            <option value="Separated">Separated</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sendReminders}
            onChange={(e) => setSendReminders(e.target.checked)}
            className="w-5 h-5 rounded border-[#E6E2DD] text-[#A892C4] focus:ring-[#A892C4]"
          />
          <span className="text-[#4A4A4A]">Send email reminders for sessions</span>
        </label>

        {error && (
          <Card className="bg-[#FFF5F5] border-[#D88B8B]">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#D88B8B] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white">!</span>
              </div>
              <div>
                <h3 className="text-[#D88B8B] mb-1">Sign Up Error</h3>
                <p className="text-[#D88B8B]">{error}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex flex-col gap-3">
          <Button onClick={handleSignUp} disabled={loading} fullWidth>
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 size={20} className="animate-spin" />
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </Button>

          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-[#E6E2DD]" />
            <small className="text-[#9EA7B2]">or</small>
            <div className="flex-1 h-px bg-[#E6E2DD]" />
          </div>

          <Button onClick={handleGoogleSignUp} variant="secondary" disabled={loading} fullWidth>
            <span className="flex items-center gap-2 justify-center">
              <Mail size={20} />
              Continue with Google
            </span>
          </Button>
        </div>

        <p className="text-center text-[#6A6A6A]">
          Already have an account?{' '}
          <button
            onClick={() => navigate('login')}
            className="text-[#8B7AA8]"
          >
            Login
          </button>
        </p>

        <Card className="bg-[#F9F7FF]">
          <p className="text-[#8B7AA8] text-center">
            <strong>Supabase Auth:</strong> Sign up flow connected to Supabase Authentication
          </p>
        </Card>
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => {}}
        title="Account Created!"
        actions={
          <Button
            onClick={() => {
              setShowSuccessModal(false);
              showToast('Account created successfully!');
              navigate('profile-setup');
            }}
            fullWidth
          >
            Continue to Profile Setup
          </Button>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-[#7DBB9F] flex items-center justify-center">
            <CheckCircle className="text-white" size={32} />
          </div>
          <p className="text-center">
            Your account has been created successfully! Let's set up your profile to personalize your experience.
          </p>
        </div>
      </Modal>
    </div>
  );
}
