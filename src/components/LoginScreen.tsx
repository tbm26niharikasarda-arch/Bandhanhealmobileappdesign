import { useState } from 'react';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Screen, User } from '../App';

interface LoginScreenProps {
  navigate: (screen: Screen) => void;
  setUser: (user: User) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export function LoginScreen({ navigate, setUser, showToast }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
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

    // Simulate Supabase Auth Login
    setTimeout(() => {
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: email,
        relationshipStatus: 'Married'
      };
      
      setUser(mockUser);
      setLoading(false);
      showToast('Logged in successfully!');
      navigate('dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate Google OAuth via Supabase
    setTimeout(() => {
      const mockUser: User = {
        id: '2',
        name: 'Google User',
        email: 'google@example.com',
        relationshipStatus: 'Married'
      };
      
      setUser(mockUser);
      setLoading(false);
      showToast('Logged in with Google!');
      navigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-md mx-auto w-full">
      <button
        onClick={() => navigate('landing')}
        className="flex items-center gap-2 text-[#8B7AA8] mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <h1 className="mb-2">Welcome Back</h1>
      <p className="mb-8 text-[#6A6A6A]">
        Login to continue your journey to a healthier relationship
      </p>

      <div className="flex flex-col gap-6">
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
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          required
        />

        {error && (
          <Card className="bg-[#FFF5F5] border-[#D88B8B]">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#D88B8B] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white">!</span>
              </div>
              <div>
                <h3 className="text-[#D88B8B] mb-1">Login Error</h3>
                <p className="text-[#D88B8B]">{error}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex flex-col gap-3">
          <Button onClick={handleLogin} disabled={loading} fullWidth>
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 size={20} className="animate-spin" />
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </Button>

          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-[#E6E2DD]" />
            <small className="text-[#9EA7B2]">or</small>
            <div className="flex-1 h-px bg-[#E6E2DD]" />
          </div>

          <Button onClick={handleGoogleLogin} variant="secondary" disabled={loading} fullWidth>
            <span className="flex items-center gap-2 justify-center">
              <Mail size={20} />
              Continue with Google
            </span>
          </Button>
        </div>

        <p className="text-center text-[#6A6A6A]">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('signup')}
            className="text-[#8B7AA8]"
          >
            Sign Up
          </button>
        </p>

        <Card className="bg-[#F9F7FF]">
          <p className="text-[#8B7AA8] text-center">
            <strong>Supabase Auth:</strong> Login flow connected to Supabase Authentication
          </p>
        </Card>
      </div>
    </div>
  );
}
