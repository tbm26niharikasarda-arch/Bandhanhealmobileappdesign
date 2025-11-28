import { Home, Calendar, TrendingUp, FileText, User } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavProps {
  active: Screen;
  navigate: (screen: Screen) => void;
}

export function BottomNav({ active, navigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard' as Screen, icon: Home, label: 'Home' },
    { id: 'therapist-directory' as Screen, icon: Calendar, label: 'Book' },
    { id: 'progress' as Screen, icon: TrendingUp, label: 'Progress' },
    { id: 'notes' as Screen, icon: FileText, label: 'Notes' },
    { id: 'settings' as Screen, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E6E2DD] px-4 py-3 safe-area-bottom">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all"
          >
            <item.icon 
              size={24} 
              className={active === item.id ? 'text-[#A892C4]' : 'text-[#9EA7B2]'}
            />
            <small className={active === item.id ? 'text-[#A892C4]' : 'text-[#9EA7B2]'}>
              {item.label}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}
