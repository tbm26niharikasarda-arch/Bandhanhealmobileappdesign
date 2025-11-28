import { useState } from 'react';
import { ArrowLeft, User as UserIcon, Bell, Calendar, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Modal } from './Modal';
import { BottomNav } from './BottomNav';
import { Screen, User } from '../App';

interface SettingsPageProps {
  navigate: (screen: Screen) => void;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export function SettingsPage({ navigate, user, setUser, logout, showToast }: SettingsPageProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');
  const [notifications, setNotifications] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);

  const handleSaveProfile = () => {
    if (user) {
      setUser({
        ...user,
        name: editName,
        phone: editPhone,
        location: editLocation
      });
      setShowEditModal(false);
      showToast('Profile updated successfully!');
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-12 pb-32 relative">
        <h1 className="text-white mb-2">Settings</h1>
        <p className="text-white text-opacity-90">
          Manage your account and preferences
        </p>
      </div>

      <div className="px-6 -mt-24">
        <Card className="shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A892C4] to-[#8B7AA8] flex items-center justify-center">
              <UserIcon className="text-white" size={28} />
            </div>
            <div className="flex-1">
              <h2>{user?.name || 'User'}</h2>
              <p className="text-[#6A6A6A]">{user?.email}</p>
            </div>
            <button 
              onClick={() => setShowEditModal(true)}
              className="text-[#8B7AA8]"
            >
              <Edit2 size={20} />
            </button>
          </div>
          
          {user?.relationshipStatus && (
            <div className="pt-4 border-t border-[#E6E2DD]">
              <small className="text-[#6A6A6A]">Relationship Status</small>
              <p>{user.relationshipStatus}</p>
            </div>
          )}
        </Card>

        <h3 className="mb-4">Preferences</h3>
        
        <Card className="mb-4">
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center">
                <Bell className="text-[#A892C4]" size={20} />
              </div>
              <div className="text-left">
                <h3>Notifications</h3>
                <small className="text-[#6A6A6A]">Push notifications</small>
              </div>
            </div>
            <label className="relative inline-block w-12 h-7">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-[#E6E2DD] peer-checked:bg-[#A892C4] rounded-full transition-colors cursor-pointer" />
              <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
          </button>
        </Card>

        <Card className="mb-4">
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center">
                <Bell className="text-[#A892C4]" size={20} />
              </div>
              <div className="text-left">
                <h3>Email Reminders</h3>
                <small className="text-[#6A6A6A]">Session reminders via email</small>
              </div>
            </div>
            <label className="relative inline-block w-12 h-7">
              <input
                type="checkbox"
                checked={emailReminders}
                onChange={(e) => setEmailReminders(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-[#E6E2DD] peer-checked:bg-[#A892C4] rounded-full transition-colors cursor-pointer" />
              <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
          </button>
        </Card>

        <Card className="mb-6">
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center">
                <Calendar className="text-[#A892C4]" size={20} />
              </div>
              <div className="text-left">
                <h3>Google Calendar Sync</h3>
                <small className="text-[#6A6A6A]">Auto-add sessions to calendar</small>
              </div>
            </div>
            <label className="relative inline-block w-12 h-7">
              <input
                type="checkbox"
                checked={calendarSync}
                onChange={(e) => setCalendarSync(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-[#E6E2DD] peer-checked:bg-[#A892C4] rounded-full transition-colors cursor-pointer" />
              <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
          </button>
        </Card>

        <h3 className="mb-4">More</h3>

        <Card className="mb-4" onClick={() => navigate('about')}>
          <div className="flex items-center justify-between">
            <h3>About BandhanHeal</h3>
            <ChevronRight className="text-[#9EA7B2]" size={20} />
          </div>
        </Card>

        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <h3>Privacy Policy</h3>
            <ChevronRight className="text-[#9EA7B2]" size={20} />
          </div>
        </Card>

        <Button
          onClick={() => setShowLogoutModal(true)}
          variant="secondary"
          fullWidth
        >
          <LogOut size={20} className="inline mr-2" />
          Logout
        </Button>

        <Card className="mt-6 bg-[#F9F7FF]">
          <p className="text-[#8B7AA8] text-center">
            <strong>Supabase:</strong> Profile edits update 'profiles' table. Logout uses signOut()
          </p>
        </Card>
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
        actions={
          <>
            <Button onClick={() => setShowEditModal(false)} variant="secondary" fullWidth>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} fullWidth>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Name"
            value={editName}
            onChange={setEditName}
          />
          <Input
            label="Phone"
            value={editPhone}
            onChange={setEditPhone}
          />
          <Input
            label="Location"
            value={editLocation}
            onChange={setEditLocation}
          />
        </div>
      </Modal>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Logout"
        actions={
          <>
            <Button onClick={() => setShowLogoutModal(false)} variant="secondary" fullWidth>
              Cancel
            </Button>
            <Button onClick={handleLogout} fullWidth>
              Yes, Logout
            </Button>
          </>
        }
      >
        <p className="text-center">
          Are you sure you want to logout? You'll need to login again to access your account.
        </p>
      </Modal>

      <BottomNav active="settings" navigate={navigate} />
    </div>
  );
}
