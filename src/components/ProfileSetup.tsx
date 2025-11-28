import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Screen, User } from '../App';

interface ProfileSetupProps {
  navigate: (screen: Screen) => void;
  user: User | null;
  setUser: (user: User) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export function ProfileSetup({ navigate, user, setUser, showToast }: ProfileSetupProps) {
  const [name, setName] = useState(user?.name || '');
  const [partnerName, setPartnerName] = useState(user?.partnerName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [issues, setIssues] = useState<string[]>(user?.issues || []);
  const [preferredMode, setPreferredMode] = useState(user?.preferredMode || '');
  const [budget, setBudget] = useState(user?.budget || '');
  const [location, setLocation] = useState(user?.location || '');
  const [loading, setLoading] = useState(false);

  const issueOptions = [
    'Communication',
    'Trust Issues',
    'Intimacy',
    'Financial Stress',
    'Parenting',
    'In-Laws',
    'Infidelity',
    'Life Transitions',
    'Emotional Distance'
  ];

  const toggleIssue = (issue: string) => {
    if (issues.includes(issue)) {
      setIssues(issues.filter(i => i !== issue));
    } else {
      setIssues([...issues, issue]);
    }
  };

  const handleSaveProfile = async () => {
    if (!name) {
      showToast('Please enter your name', 'error');
      return;
    }

    if (issues.length === 0) {
      showToast('Please select at least one area to work on', 'error');
      return;
    }

    setLoading(true);

    // Simulate Supabase Database Insert/Update to 'profiles' table
    setTimeout(() => {
      const updatedUser: User = {
        ...user!,
        name,
        partnerName,
        phone,
        issues,
        preferredMode,
        budget,
        location
      };

      setUser(updatedUser);
      setLoading(false);
      showToast('Profile saved successfully!');
      navigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-md mx-auto w-full pb-20">
      <h1 className="mb-2">Complete Your Profile</h1>
      <p className="mb-8 text-[#6A6A6A]">
        Help us personalize your therapy experience
      </p>

      <div className="flex flex-col gap-6">
        <Input
          label="Your Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={setName}
          required
        />

        <Input
          label="Partner's Name"
          type="text"
          placeholder="Enter partner's name (optional)"
          value={partnerName}
          onChange={setPartnerName}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 XXXXX XXXXX (optional)"
          value={phone}
          onChange={setPhone}
        />

        <div className="flex flex-col gap-2">
          <label className="text-[#4A4A4A]">
            Areas You Want to Work On <span className="text-[#D88B8B]">*</span>
          </label>
          <p className="text-[#6A6A6A]">Select all that apply</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {issueOptions.map(issue => (
              <button
                key={issue}
                onClick={() => toggleIssue(issue)}
                className={`px-4 py-2 rounded-full transition-all ${
                  issues.includes(issue)
                    ? 'bg-[#A892C4] text-white'
                    : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
                }`}
              >
                {issue}
                {issues.includes(issue) && (
                  <X size={14} className="inline ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#4A4A4A]">Preferred Mode</label>
          <div className="grid grid-cols-3 gap-3">
            {['Online', 'Offline', 'Hybrid'].map(mode => (
              <button
                key={mode}
                onClick={() => setPreferredMode(mode)}
                className={`px-4 py-3 rounded-2xl transition-all ${
                  preferredMode === mode
                    ? 'bg-[#A892C4] text-white'
                    : 'bg-white text-[#5A5A5A] border border-[#E6E2DD]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#4A4A4A]">Budget per Session</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-white border border-[#E6E2DD] focus:border-[#A892C4] focus:outline-none"
          >
            <option value="">Select budget range</option>
            <option value="₹1000-2000">₹1000 - ₹2000</option>
            <option value="₹2000-3000">₹2000 - ₹3000</option>
            <option value="₹3000-5000">₹3000 - ₹5000</option>
            <option value="₹5000+">₹5000+</option>
          </select>
        </div>

        <Input
          label="Your City"
          type="text"
          placeholder="e.g., Mumbai, Delhi"
          value={location}
          onChange={setLocation}
        />

        <Card className="bg-[#F9F7FF]">
          <p className="text-[#8B7AA8] text-center">
            <strong>Supabase Database:</strong> Profile will be saved to 'profiles' table
          </p>
        </Card>

        <Button onClick={handleSaveProfile} disabled={loading} fullWidth>
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 size={20} className="animate-spin" />
              Saving Profile...
            </span>
          ) : (
            'Save Profile & Continue'
          )}
        </Button>
      </div>
    </div>
  );
}
