import { ArrowLeft, Mail, Calendar, CheckCircle, Heart } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Screen } from '../App';

interface EmailNotificationMockProps {
  navigate: (screen: Screen) => void;
}

export function EmailNotificationMock({ navigate }: EmailNotificationMockProps) {
  const emails = [
    {
      id: '1',
      subject: 'Session Reminder - Tomorrow at 10:00 AM',
      from: 'BandhanHeal <noreply@bandhanheal.com>',
      date: '28 Nov, 2024',
      preview: 'Your session with Dr. Priya Sharma is scheduled for tomorrow',
      type: 'reminder',
      body: `
        <h2>Session Reminder</h2>
        <p>Hi there,</p>
        <p>This is a friendly reminder that your therapy session is scheduled for:</p>
        <div style="background: #F4EFEA; padding: 20px; border-radius: 16px; margin: 20px 0;">
          <p><strong>Therapist:</strong> Dr. Priya Sharma</p>
          <p><strong>Date:</strong> 29 Nov, 2024</p>
          <p><strong>Time:</strong> 10:00 AM</p>
          <p><strong>Mode:</strong> Online</p>
        </div>
        <p><strong>Session Link:</strong> https://meet.bandhanheal.com/session-12345</p>
        <p>Please join 5 minutes early to ensure a smooth start.</p>
        <p>Warm regards,<br/>The BandhanHeal Team</p>
      `
    },
    {
      id: '2',
      subject: 'Booking Confirmed - Session with Dr. Priya Sharma',
      from: 'BandhanHeal <noreply@bandhanheal.com>',
      date: '27 Nov, 2024',
      preview: 'Your therapy session has been successfully booked',
      type: 'confirmation',
      body: `
        <h2>Booking Confirmation</h2>
        <p>Hi there,</p>
        <p>Your therapy session has been successfully scheduled!</p>
        <div style="background: #E8F5EE; padding: 20px; border-radius: 16px; margin: 20px 0; border: 2px solid #7DBB9F;">
          <p><strong>Confirmation Number:</strong> BH-2024-001234</p>
          <p><strong>Therapist:</strong> Dr. Priya Sharma</p>
          <p><strong>Date:</strong> 29 Nov, 2024</p>
          <p><strong>Time:</strong> 10:00 AM</p>
          <p><strong>Session Fee:</strong> ₹2500</p>
        </div>
        <p>We've added this to your calendar. You'll receive a reminder 24 hours before your session.</p>
        <p>Looking forward to supporting your journey,<br/>The BandhanHeal Team</p>
      `
    },
    {
      id: '3',
      subject: 'Follow-up: Your Session Notes & Action Items',
      from: 'Dr. Priya Sharma via BandhanHeal <noreply@bandhanheal.com>',
      date: '23 Nov, 2024',
      preview: 'Session notes and recommended exercises from your recent session',
      type: 'followup',
      body: `
        <h2>Session Follow-up</h2>
        <p>Hi there,</p>
        <p>Thank you for attending your session on 22 Nov, 2024. Here are your session notes and action items:</p>
        
        <h3>Session Summary</h3>
        <div style="background: #F9F7FF; padding: 20px; border-radius: 16px; margin: 20px 0;">
          <p>We discussed communication patterns and identified areas for improvement. Great progress on being more open to vulnerability.</p>
        </div>
        
        <h3>Action Items for This Week</h3>
        <ul>
          <li>Schedule 15-minute daily check-ins with your partner</li>
          <li>Practice using "I feel" statements instead of "You always"</li>
          <li>Complete the communication worksheet (attached)</li>
        </ul>
        
        <p>Remember, small consistent steps lead to meaningful change. I'm proud of the work you're both putting in.</p>
        
        <p>See you at our next session,<br/>Dr. Priya Sharma</p>
      `
    }
  ];

  const [selectedEmail, setSelectedEmail] = useState<typeof emails[0] | null>(null);

  return (
    <div className="min-h-screen pb-8">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-8 pb-6">
        <button
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-2 text-white mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="text-white mb-2">Email Notifications</h1>
        <p className="text-white text-opacity-90">
          Mock email notifications sent by BandhanHeal
        </p>
      </div>

      <div className="px-6 py-6">
        <Card className="mb-6 bg-[#F9F7FF]">
          <div className="flex items-start gap-3">
            <Mail className="text-[#A892C4]" size={24} />
            <div>
              <h3 className="mb-1">Email Notification System</h3>
              <p className="text-[#6A6A6A]">
                These are simulated email notifications that would be sent to users for session reminders, booking confirmations, and follow-ups.
              </p>
            </div>
          </div>
        </Card>

        {!selectedEmail ? (
          <div className="flex flex-col gap-4">
            {emails.map(email => (
              <Card key={email.id} onClick={() => setSelectedEmail(email)}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    email.type === 'reminder' ? 'bg-[#FFF5E6]' :
                    email.type === 'confirmation' ? 'bg-[#E8F5EE]' :
                    'bg-[#F9F7FF]'
                  }`}>
                    {email.type === 'reminder' && <Calendar className="text-[#FFB347]" size={24} />}
                    {email.type === 'confirmation' && <CheckCircle className="text-[#7DBB9F]" size={24} />}
                    {email.type === 'followup' && <Heart className="text-[#A892C4]" size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 truncate">{email.subject}</h3>
                    <p className="text-[#6A6A6A] mb-2">{email.from}</p>
                    <small className="text-[#9EA7B2]">{email.date}</small>
                    <p className="text-[#6A6A6A] mt-2 truncate">{email.preview}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <Button 
              onClick={() => setSelectedEmail(null)} 
              variant="ghost"
              className="mb-4"
            >
              <ArrowLeft size={20} className="inline mr-2" />
              Back to Inbox
            </Button>

            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedEmail.type === 'reminder' ? 'bg-[#FFF5E6]' :
                    selectedEmail.type === 'confirmation' ? 'bg-[#E8F5EE]' :
                    'bg-[#F9F7FF]'
                  }`}>
                    <Mail className="text-[#A892C4]" size={20} />
                  </div>
                  <div>
                    <h3>{selectedEmail.subject}</h3>
                    <small className="text-[#6A6A6A]">{selectedEmail.date}</small>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[#6A6A6A]">
                  <strong>From:</strong> {selectedEmail.from}
                </p>
              </div>

              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                style={{
                  fontFamily: 'inherit',
                  color: '#3A3A3A',
                  lineHeight: '1.6'
                }}
              />
            </Card>

            <Card className="bg-[#F4EFEA]">
              <p className="text-[#6A6A6A] text-center">
                This is a mock email notification. Actual emails would be sent via your configured email service.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  let state = initialValue;
  return [
    state,
    (newValue: T) => { state = newValue; }
  ];
}
