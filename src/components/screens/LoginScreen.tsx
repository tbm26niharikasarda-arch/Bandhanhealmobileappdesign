import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { supabaseAuth } from '../../lib/supabase';
import { Card } from '../Card';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (user: any) => void;
  onSignUp: () => void;
}

export function LoginScreen({ onBack, onLoginSuccess, onSignUp }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError('');
    if (!validateForm()) return;

    setLoading(true);
    // Simulate Supabase Auth Login
    const result = await supabaseAuth.signIn(email, password);
    setLoading(false);

    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Simulate Supabase OAuth Google Login
    const result = await supabaseAuth.signInWithGoogle();
    setLoading(false);

    if (result.success) {
      onLoginSuccess(result.user);
    } else {
      setError('Google login failed');
    }
  };

  return (
    <div className="min-h-screen bg-warm-neutral p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="space-y-6">
          <div>
            <h1 className="text-text-primary mb-2">Welcome Back</h1>
            <p className="text-text-secondary">Log in to continue your journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <Card className="bg-error/10 border-error">
              <p className="text-error text-sm">{error}</p>
            </Card>
          )}

          {/* Login Form */}
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? 'Email is required' : undefined}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? 'Password is required' : undefined}
            />

            <button className="text-muted-purple text-sm hover:underline">
              Forgot password?
            </button>

            <Button fullWidth loading={loading} onClick={handleLogin}>
              <Mail size={20} />
              Log In
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-soft-grey-purple"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-warm-neutral text-text-secondary">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            fullWidth
            variant="secondary"
            loading={loading}
            onClick={handleGoogleLogin}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.8 10.2273C19.8 9.51818 19.7364 8.83636 19.6182 8.18182H10V12.05H15.4182C15.2 13.3 14.4727 14.3591 13.3864 15.0682V17.5773H16.7182C18.7091 15.7364 19.8 13.2273 19.8 10.2273Z" fill="#4285F4"/>
              <path d="M9.99995 20C12.6999 20 14.9636 19.1045 16.7181 17.5773L13.3863 15.0682C12.4908 15.6682 11.3454 16.0227 9.99995 16.0227C7.39541 16.0227 5.19086 14.1636 4.40449 11.7273H0.963623V14.3182C2.70903 17.7909 6.09086 20 9.99995 20Z" fill="#34A853"/>
              <path d="M4.40455 11.7273C4.22728 11.1273 4.12728 10.4909 4.12728 9.83636C4.12728 9.18182 4.22728 8.54545 4.40455 7.94545V5.35455H0.963639C0.290912 6.69091 -0.0999756 8.21818 -0.0999756 9.83636C-0.0999756 11.4545 0.290912 12.9818 0.963639 14.3182L4.40455 11.7273Z" fill="#FBBC05"/>
              <path d="M9.99995 3.64545C11.4681 3.64545 12.7681 4.16364 13.7863 5.12727L16.7272 2.18636C14.959 0.568182 12.6954 -0.363636 9.99995 -0.363636C6.09086 -0.363636 2.70903 1.84545 0.963623 5.31818L4.40449 7.90909C5.19086 5.47273 7.39541 3.64545 9.99995 3.64545Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-text-secondary">
            Don't have an account?{' '}
            <button onClick={onSignUp} className="text-muted-purple hover:underline">
              Sign Up
            </button>
          </p>

          {/* Supabase Integration Note */}
          <Card className="bg-muted-purple/10 border-muted-purple/30">
            <p className="text-text-secondary text-sm">
              🔒 <strong>Supabase Auth Integration:</strong> This login flow uses Supabase Authentication
              for secure email/password and OAuth (Google) login.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
