import { ArrowLeft, Star, Video, MapPin, Award, Calendar } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Screen, Therapist } from '../App';

interface TherapistProfileProps {
  navigate: (screen: Screen) => void;
  therapist: Therapist | null;
}

export function TherapistProfile({ navigate, therapist }: TherapistProfileProps) {
  if (!therapist) {
    navigate('therapist-directory');
    return null;
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="bg-gradient-to-br from-[#CFC9D9] to-[#A892C4] px-6 pt-8 pb-32 relative">
        <button
          onClick={() => navigate('therapist-directory')}
          className="flex items-center gap-2 text-white mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="px-6 -mt-24">
        <Card className="shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F4EFEA]">
              <div className="w-full h-full bg-gradient-to-br from-[#CFC9D9] to-[#A892C4]" />
            </div>
            <div className="flex-1">
              <h2 className="mb-1">{therapist.name}</h2>
              <p className="text-[#6A6A6A] mb-2">{therapist.specialization}</p>
              <div className="flex items-center gap-1 mb-2">
                <Star size={16} className="text-[#FFD700] fill-[#FFD700]" />
                <span>{therapist.rating}</span>
                <small className="text-[#6A6A6A] ml-2">{therapist.reviews.length} reviews</small>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {therapist.online && (
              <span className="flex-1 px-4 py-2 rounded-xl bg-[#F4EFEA] text-[#8B7AA8] text-center">
                <Video size={16} className="inline mr-2" />
                <small>Online</small>
              </span>
            )}
            {therapist.offline && (
              <span className="flex-1 px-4 py-2 rounded-xl bg-[#F4EFEA] text-[#8B7AA8] text-center">
                <MapPin size={16} className="inline mr-2" />
                <small>In-Person</small>
              </span>
            )}
          </div>

          <div className="flex justify-between items-center py-4 border-y border-[#E6E2DD]">
            <div className="text-center flex-1">
              <div className="text-[#A892C4] mb-1">{therapist.experience}</div>
              <small className="text-[#6A6A6A]">Experience</small>
            </div>
            <div className="w-px h-12 bg-[#E6E2DD]" />
            <div className="text-center flex-1">
              <div className="text-[#A892C4] mb-1">{therapist.fee}</div>
              <small className="text-[#6A6A6A]">Per Session</small>
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <h3 className="mb-3">Qualifications</h3>
          <div className="flex flex-col gap-2">
            {therapist.qualifications.map((qual, index) => (
              <div key={index} className="flex items-center gap-3 bg-white rounded-2xl p-4">
                <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
                  <Award className="text-[#A892C4]" size={20} />
                </div>
                <p>{qual}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3">About</h3>
          <Card>
            <p>
              With {therapist.experience} of experience, {therapist.name} specializes in {therapist.specialization.toLowerCase()}. 
              They provide a safe, non-judgmental space for couples to explore their relationships and work towards healing and growth.
            </p>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className="mb-3">Client Reviews</h3>
          <div className="flex flex-col gap-4">
            {therapist.reviews.map((review, index) => (
              <Card key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span>{review.author}</span>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
                    <small>{review.rating}</small>
                  </div>
                </div>
                <p className="text-[#6A6A6A]">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3">Availability</h3>
          <Card>
            <div className="grid grid-cols-3 gap-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, 6).map(day => (
                <div
                  key={day}
                  className="px-3 py-2 rounded-xl bg-[#F4EFEA] text-center text-[#8B7AA8]"
                >
                  <small>{day}</small>
                </div>
              ))}
            </div>
            <p className="text-[#6A6A6A] mt-4">
              Morning & Evening slots available
            </p>
          </Card>
        </div>

        <div className="mt-6 sticky bottom-6">
          <Button onClick={() => navigate('booking')} fullWidth>
            <Calendar size={20} className="inline mr-2" />
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
