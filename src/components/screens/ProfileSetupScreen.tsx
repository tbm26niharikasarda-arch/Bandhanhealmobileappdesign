import React, { useState } from 'react';
import { Button } from '../Button';
import { Input, Select } from '../Input';
import { Chip } from '../Chip';
import { ArrowLeft } from 'lucide-react';
import { supabaseDB } from '../../lib/supabase';
import { Card } from '../Card';

interface ProfileSetupScreenProps {
  onComplete: () => void;
  user: any;
}

export function ProfileSetupScreen({ onComplete, user }: ProfileSetupScreenProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    partnerName: '',
    issues: [] as string[],
    preferredMode: '',
    budget: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const issueOptions = [
    'Communication',
    'Trust Building',
    'Intimacy',
    'Conflict Resolution',
    'Financial Stress',
    'Parenting',
    'In-laws',
    'Work-Life Balance',
    'Infidelity Recovery',
    'Pre-marital Counseling',
  ];

  const modeOptions = [
    { value: '', label: 'Select mode' },
    { value: 'Online', label: 'Online Only' },
    { value: 'Offline', label: 'In-Person Only' },
    { value: 'Hybrid', label: 'Hybrid (Both)' },
  ];

  const budgetOptions = [
    { value: '', label: 'Select budget range' },
    { value: '500-1000', label: '₹500 - ₹1,000 per session' },
    { value: '1000-2000', label: '₹1,000 - ₹2,000 per session' },
    { value: '2000-5000', label: '₹2,000 - ₹5,000 per session' },
    { value: '5000+', label: '₹5,000+ per session' },
  ];

  const toggleIssue = (issue: string) => {
    if (formData.issues.includes(issue)) {
      setFormData({
        ...formData,
        issues: formData.issues.filter((i) => i !== issue),
      });
    } else {
      setFormData({
        ...formData,
        issues: [...formData.issues, issue],
      });
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);

    // Simulate saving to Supabase profiles table
    const result = await supabaseDB.createProfile({
      name: formData.name,
      partner_name: formData.partnerName,
      therapy_goals: formData.issues,
      preferred_mode: formData.preferredMode as any,
      budget_preference: formData.budget,
      location: formData.location,
      email: user?.email,
    });

    setLoading(false);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-warm-neutral p-6 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-text-primary mb-2">Complete Your Profile</h1>
          <p className="text-text-secondary">Help us personalize your therapy experience</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Card className="bg-success/10 border-success mb-6">
            <p className="text-success text-sm">✓ Profile saved to Supabase successfully! Redirecting...</p>
          </Card>
        )}

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <Input
              label="Your Name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              label="Partner's Name (Optional)"
              type="text"
              placeholder="Your partner's name"
              value={formData.partnerName}
              onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
            />
          </div>

          {/* Issues Multi-Select */}
          <div>
            <label className="block mb-3 text-text-primary">
              What areas would you like to work on?
            </label>
            <div className="flex flex-wrap gap-2">
              {issueOptions.map((issue) => (
                <Chip
                  key={issue}
                  label={issue}
                  selected={formData.issues.includes(issue)}
                  onToggle={() => toggleIssue(issue)}
                />
              ))}
            </div>
            <p className="mt-2 text-text-secondary text-sm">
              Select all that apply
            </p>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <Select
              label="Preferred Mode"
              options={modeOptions}
              value={formData.preferredMode}
              onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
            />

            <Select
              label="Budget Preference"
              options={budgetOptions}
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />

            <Input
              label="Location (Optional)"
              type="text"
              placeholder="City or area"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              helperText="For in-person sessions"
            />
          </div>

          {/* Save Button */}
          <Button fullWidth loading={loading} onClick={handleSaveProfile}>
            Save Profile & Continue
          </Button>

          {/* Supabase Integration Note */}
          <Card className="bg-muted-purple/10 border-muted-purple/30">
            <p className="text-text-secondary text-sm">
              💾 <strong>Supabase Database:</strong> Your profile data will be saved to the
              'profiles' table in Supabase with fields: name, partner_name, therapy_goals,
              preferred_mode, budget_preference, and location.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
