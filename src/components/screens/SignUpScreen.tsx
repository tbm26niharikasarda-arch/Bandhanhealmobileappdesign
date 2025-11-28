import React, { useState } from 'react';
import { Button } from '../Button';
import { Input, Select } from '../Input';
import { ArrowLeft } from 'lucide-react';
import { supabaseAuth } from '../../lib/supabase';
import { Card } from '../Card';

interface SignUpScreenProps {
  onBack: () => void;
  onSignUpSuccess: (user: any) => void;
  onLogin: () => void;
}

export function SignUpScreen({ onBack, onSignUpSuccess, onLogin }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    relationshipStatus: '',
    emailReminders: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const relationshipOptions = [
    { value: '', label: 'Select relationship status' },
    { value: 'Dating', label: 'Dating' },
    { value: 'Engaged', label: 'Engaged' },
    { value: 'Married', label: 'Married' },
    { value: 'Domestic Partnership', label: 'Domestic Partnership' },
    { value: 'Other', label: 'Other' },
  ];

  const validateForm = () => {
    if (!formData.name) {
      setError('Name is required');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.relationshipStatus) {
      setError('Please select your relationship status');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setError('');
    if (!validateForm()) return;

    setLoading(true);
    // Simulate Supabase Auth SignUp
    const result = await supabaseAuth.signUp(formData.email, formData.password, {
      name: formData.name,
      relationship_status: formData.relationshipStatus,
    });
    setLoading(false);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        onSignUpSuccess(result.user);
      }, 1500);
    } else {
      setError(result.error || 'Sign up failed. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const result = await supabaseAuth.signInWithGoogle();
    setLoading(false);

    if (result.success) {
      onSignUpSuccess(result.user);
    } else {
      setError('Google sign up failed');
    }
  };

  return (
    <div className="min-h-screen bg-warm-neutral p-6 pb-20">
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
            <h1 className="text-text-primary mb-2">Create Account</h1>
            <p className="text-text-secondary">Begin your journey to a stronger relationship</p>
          </div>

          {/* Error Message */}
          {error && (
            <Card className="bg-error/10 border-error">
              <p className="text-error text-sm">{error}</p>
            </Card>
          )}

          {/* Success Message */}
          {showSuccess && (
            <Card className="bg-success/10 border-success">
              <p className="text-success text-sm">✓ Account created successfully! Redirecting...</p>
            </Card>
          )}

          {/* Sign Up Form */}
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              helperText="Must be at least 6 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />

            <Select
              label="Relationship Status"
              options={relationshipOptions}
              value={formData.relationshipStatus}
              onChange={(e) => setFormData({ ...formData, relationshipStatus: e.target.value })}
            />

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.emailReminders}
                onChange={(e) => setFormData({ ...formData, emailReminders: e.target.checked })}
                className="w-5 h-5 rounded border-soft-grey-purple text-muted-purple focus:ring-muted-purple"
              />
              <span className="text-text-primary text-sm">Send me email reminders for sessions</span>
            </label>

            <Button fullWidth loading={loading} onClick={handleSignUp}>
              Create Account
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

          {/* Google Sign Up */}
          <Button
            fullWidth
            variant="secondary"
            loading={loading}
            onClick={handleGoogleSignUp}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.8 10.2273C19.8 9.51818 19.7364 8.83636 19.6182 8.18182H10V12.05H15.4182C15.2 13.3 14.4727 14.3591 13.3864 15.0682V17.5773H16.7182C18.7091 15.7364 19.8 13.2273 19.8 10.2273Z" fill="#4285F4"/>
              <path d="M9.99995 20C12.6999 20 14.9636 19.1045 16.7181 17.5773L13.3863 15.0682C12.4908 15.6682 11.3454 16.0227 9.99995 16.0227C7.39541 16.0227 5.19086 14.1636 4.40449 11.7273H0.963623V14.3182C2.70903 17.7909 6.09086 20 9.99995 20Z" fill="#34A853"/>
              <path d="M4.40455 11.7273C4.22728 11.1273 4.12728 10.4909 4.12728 9.83636C4.12728 9.18182 4.22728 8.54545 4.40455 7.94545V5.35455H0.963639C0.290912 6.69091 -0.0999756 8.21818 -0.0999756 9.83636C-0.0999756 11.4545 0.290912 12.9818 0.963639 14.3182L4.40455 11.7273Z" fill="#FBBC05"/>
              <path d="M9.99995 3.64545C11.4681 3.64545 12.7681 4.16364 13.7863 5.12727L16.7272 2.18636C14.959 0.568182 12.6954 -0.363636 9.99995 -0.363636C6.09086 -0.363636 2.70903 1.84545 0.963623 5.31818L4.40449 7.90909C5.19086 5.47273 7.39541 3.64545 9.99995 3.64545Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="text-center text-text-secondary">
            Already have an account?{' '}
            <button onClick={onLogin} className="text-muted-purple hover:underline">
              Log In
            </button>
          </p>

          {/* Supabase Integration Note */}
          <Card className="bg-muted-purple/10 border-muted-purple/30">
            <p className="text-text-secondary text-sm">
              🔒 <strong>Supabase Auth Integration:</strong> On successful signup, user data is
              created in Supabase Auth and will redirect to Profile Setup to save additional details
              to the 'profiles' table.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
