import { FileText, Calendar, CheckSquare } from 'lucide-react';
import { Card } from './Card';
import { BottomNav } from './BottomNav';
import { Screen } from '../App';

interface NotesPageProps {
  navigate: (screen: Screen) => void;
}

export function NotesPage({ navigate }: NotesPageProps) {
  const sessions = [
    {
      id: '1',
      date: '22 Nov, 2024',
      therapist: 'Dr. Priya Sharma',
      notes: 'Discussed communication patterns and identified areas of improvement. Practice active listening daily.',
      actionItems: [
        'Schedule 15-minute daily check-ins',
        'Practice "I feel" statements instead of "You always"',
        'Complete communication worksheet'
      ],
      completed: [true, true, false]
    },
    {
      id: '2',
      date: '15 Nov, 2024',
      therapist: 'Dr. Priya Sharma',
      notes: 'Explored trust-building exercises. Couples showed openness to vulnerability and emotional expression.',
      actionItems: [
        'Share one thing you appreciate daily',
        'Plan a date night without phones',
        'Read Chapter 3 of "The Seven Principles"'
      ],
      completed: [true, true, true]
    },
    {
      id: '3',
      date: '8 Nov, 2024',
      therapist: 'Dr. Priya Sharma',
      notes: 'First session - intake and relationship history. Identified primary concerns: communication and emotional intimacy.',
      actionItems: [
        'Complete relationship assessment form',
        'Journal individual thoughts before next session',
        'List 3 positive moments from the week'
      ],
      completed: [true, true, true]
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-12 pb-8 rounded-b-[2rem]">
        <h1 className="text-white mb-2">Therapy Notes</h1>
        <p className="text-white text-opacity-90">
          Review insights and action items from your sessions
        </p>
      </div>

      <div className="px-6 py-6">
        <Card className="mb-6 bg-gradient-to-br from-[#F9F7FF] to-[#F4EFEA]">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <FileText className="text-[#A892C4]" size={24} />
            </div>
            <div>
              <h3 className="mb-1">Personalized Recommendations</h3>
              <p className="text-[#6A6A6A] mb-3">
                Based on your sessions, focus on building trust and improving daily communication habits.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white text-[#8B7AA8]">
                  <small>Communication</small>
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#8B7AA8]">
                  <small>Trust Building</small>
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#8B7AA8]">
                  <small>Intimacy</small>
                </span>
              </div>
            </div>
          </div>
        </Card>

        <h3 className="mb-4">Session Notes</h3>
        
        <div className="flex flex-col gap-6">
          {sessions.map((session, index) => (
            <Card key={session.id}>
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#E6E2DD]">
                <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center">
                  <Calendar className="text-[#A892C4]" size={20} />
                </div>
                <div>
                  <h3>{session.date}</h3>
                  <small className="text-[#6A6A6A]">{session.therapist}</small>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-2">Session Summary</h3>
                <p className="text-[#6A6A6A]">{session.notes}</p>
              </div>

              <div>
                <h3 className="mb-3">Action Items</h3>
                <div className="space-y-2">
                  {session.actionItems.map((item, itemIndex) => (
                    <label key={itemIndex} className="flex items-start gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        session.completed[itemIndex]
                          ? 'bg-[#7DBB9F] border-[#7DBB9F]'
                          : 'border-[#E6E2DD] group-hover:border-[#A892C4]'
                      }`}>
                        {session.completed[itemIndex] && (
                          <CheckSquare className="text-white" size={14} />
                        )}
                      </div>
                      <span className={`flex-1 ${
                        session.completed[itemIndex] ? 'line-through text-[#9EA7B2]' : 'text-[#3A3A3A]'
                      }`}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {index === 0 && (
                <div className="mt-4 pt-4 border-t border-[#E6E2DD]">
                  <small className="text-[#A892C4]">Most recent session</small>
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-[#F9F7FF]">
          <p className="text-[#8B7AA8] text-center">
            <strong>Supabase Database:</strong> Notes fetched from 'notes' table
          </p>
        </Card>
      </div>

      <BottomNav active="notes" navigate={navigate} />
    </div>
  );
}
