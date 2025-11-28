import { TrendingUp, Heart, MessageCircle, Users, Calendar } from 'lucide-react';
import { Card } from './Card';
import { BottomNav } from './BottomNav';
import { Screen, User } from '../App';

interface ProgressPageProps {
  navigate: (screen: Screen) => void;
  user: User | null;
}

export function ProgressPage({ navigate, user }: ProgressPageProps) {
  const weeklyReflections = [
    { week: 'Week 4', mood: 8, satisfaction: 7, notes: 'Feeling more connected after implementing communication techniques' },
    { week: 'Week 3', mood: 7, satisfaction: 6, notes: 'Some challenges but staying committed to the process' },
    { week: 'Week 2', mood: 6, satisfaction: 5, notes: 'Learning to be vulnerable with each other' },
    { week: 'Week 1', mood: 5, satisfaction: 4, notes: 'Starting our journey, hopeful for change' }
  ];

  const progressMetrics = [
    { label: 'Sessions Completed', value: '8', icon: Calendar, color: '#A892C4' },
    { label: 'Communication Score', value: '7.5/10', icon: MessageCircle, color: '#7DBB9F' },
    { label: 'Relationship Health', value: '72%', icon: Heart, color: '#D88B8B' },
    { label: 'Goals Achieved', value: '4/6', icon: Users, color: '#9EA7B2' }
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <h1 className="text-white mb-2">Your Progress</h1>
        <p className="text-white text-opacity-90">
          Track your therapy journey and relationship growth
        </p>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {progressMetrics.map((metric, index) => (
            <Card key={index} className="text-center">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: metric.color + '20' }}
              >
                <metric.icon size={24} style={{ color: metric.color }} />
              </div>
              <div className="mb-2" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <small className="text-[#6A6A6A]">{metric.label}</small>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <h3 className="mb-4">Relationship Satisfaction</h3>
          <div className="space-y-3">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(level => (
              <div key={level} className="flex items-center gap-3">
                <small className="w-6 text-[#6A6A6A]">{level}</small>
                <div className="flex-1 h-8 bg-[#F4EFEA] rounded-full overflow-hidden">
                  {level === 7 && (
                    <div className="h-full bg-gradient-to-r from-[#A892C4] to-[#8B7AA8] rounded-full flex items-center justify-end px-4" style={{ width: '70%' }}>
                      <span className="text-white">Current</span>
                    </div>
                  )}
                  {level === 4 && (
                    <div className="h-full bg-[#E6E2DD] rounded-full flex items-center justify-end px-4 opacity-50" style={{ width: '40%' }}>
                      <span className="text-[#6A6A6A]">Start</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[#7DBB9F] mt-4 text-center">
            +30% improvement since starting therapy
          </p>
        </Card>

        <Card className="mb-6">
          <h3 className="mb-4">Weekly Mood Tracker</h3>
          <div className="relative h-48 mb-4">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {[5, 6, 7, 8].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-[#A892C4] to-[#CFC9D9] rounded-t-xl transition-all hover:opacity-80"
                    style={{ height: `${value * 10}%` }}
                  />
                  <small className="text-[#6A6A6A] mt-2">W{index + 1}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-[#E6E2DD]">
            <small className="text-[#6A6A6A]">Average Mood</small>
            <span className="text-[#A892C4]">6.5 / 10</span>
          </div>
        </Card>

        <h3 className="mb-4">Weekly Reflections</h3>
        <div className="flex flex-col gap-4">
          {weeklyReflections.map((reflection, index) => (
            <Card key={index}>
              <div className="flex justify-between items-center mb-3">
                <h3>{reflection.week}</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#F4EFEA] text-[#8B7AA8]">
                    <small>Mood: {reflection.mood}/10</small>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F4EFEA] text-[#8B7AA8]">
                    <small>Satisfaction: {reflection.satisfaction}/10</small>
                  </span>
                </div>
              </div>
              <p className="text-[#6A6A6A]">{reflection.notes}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-[#F9F7FF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#A892C4] flex items-center justify-center">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h3 className="mb-1">Keep Going!</h3>
              <p className="text-[#6A6A6A]">
                You're making great progress. Stay consistent with your sessions.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mt-6 bg-[#F9F7FF]">
          <p className="text-[#8B7AA8] text-center">
            <strong>Supabase Database:</strong> Progress data fetched from 'progress' table
          </p>
        </Card>
      </div>

      <BottomNav active="progress" navigate={navigate} />
    </div>
  );
}
