import { ArrowLeft, Heart, Shield, Users, Phone, Mail, MapPin } from 'lucide-react';
import { Card } from './Card';
import { Screen } from '../App';

interface AboutPageProps {
  navigate: (screen: Screen) => void;
}

export function AboutPage({ navigate }: AboutPageProps) {
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

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <Heart className="text-[#A892C4]" size={32} />
          </div>
          <div>
            <h1 className="text-white">BandhanHeal</h1>
            <p className="text-white text-opacity-90">Healing Bonds, Building Futures</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <h3 className="mb-4">Our Mission</h3>
        <Card className="mb-6">
          <p className="mb-4">
            BandhanHeal is dedicated to strengthening relationships through compassionate, evidence-based marriage therapy and couples counseling. We believe every relationship deserves professional support to thrive.
          </p>
          <p>
            Our platform connects couples with licensed therapists who specialize in relationship dynamics, communication, and emotional wellness, making quality therapy accessible and convenient.
          </p>
        </Card>

        <h3 className="mb-4">Why Choose BandhanHeal?</h3>
        <div className="flex flex-col gap-4 mb-6">
          <Card>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
                <Shield className="text-[#A892C4]" size={24} />
              </div>
              <div>
                <h3 className="mb-2">Confidential & Secure</h3>
                <p className="text-[#6A6A6A]">
                  Your privacy is paramount. All sessions and records are encrypted and strictly confidential, following healthcare privacy standards.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
                <Users className="text-[#A892C4]" size={24} />
              </div>
              <div>
                <h3 className="mb-2">Expert Therapists</h3>
                <p className="text-[#6A6A6A]">
                  Our network includes certified marriage and family therapists, psychologists, and counselors with specialized training in couples therapy.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F4EFEA] flex items-center justify-center flex-shrink-0">
                <Heart className="text-[#A892C4]" size={24} />
              </div>
              <div>
                <h3 className="mb-2">Evidence-Based Approach</h3>
                <p className="text-[#6A6A6A]">
                  We use proven therapeutic methods including Gottman Method, Emotionally Focused Therapy (EFT), and Cognitive Behavioral Therapy (CBT).
                </p>
              </div>
            </div>
          </Card>
        </div>

        <h3 className="mb-4">Our Approach</h3>
        <Card className="mb-6 bg-gradient-to-br from-[#F9F7FF] to-[#F4EFEA]">
          <p className="mb-3">
            At BandhanHeal, we create a safe, non-judgmental space where couples can:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-[#A892C4] mt-1">•</span>
              <span className="text-[#6A6A6A]">Improve communication and conflict resolution skills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A892C4] mt-1">•</span>
              <span className="text-[#6A6A6A]">Rebuild trust and emotional intimacy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A892C4] mt-1">•</span>
              <span className="text-[#6A6A6A]">Navigate life transitions and challenges together</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A892C4] mt-1">•</span>
              <span className="text-[#6A6A6A]">Develop healthy relationship patterns</span>
            </li>
          </ul>
        </Card>

        <h3 className="mb-4">Important Notice</h3>
        <Card className="mb-6 bg-[#FFF5F5] border-[#D88B8B]">
          <p className="text-[#D88B8B]">
            <strong>Note:</strong> BandhanHeal is designed for relationship counseling and wellness. This platform is not intended for collecting personally identifiable information (PII) or securing highly sensitive data. For clinical mental health emergencies, please contact your local emergency services.
          </p>
        </Card>

        <h3 className="mb-4">Contact & Support</h3>
        <div className="flex flex-col gap-3 mb-6">
          <Card>
            <div className="flex items-center gap-3">
              <Phone className="text-[#A892C4]" size={20} />
              <div>
                <small className="text-[#6A6A6A]">Helpline</small>
                <p>1800-XXX-XXXX (24/7)</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <Mail className="text-[#A892C4]" size={20} />
              <div>
                <small className="text-[#6A6A6A]">Email Support</small>
                <p>support@bandhanheal.com</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <MapPin className="text-[#A892C4]" size={20} />
              <div>
                <small className="text-[#6A6A6A]">Headquarters</small>
                <p>Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="text-center">
          <small className="text-[#6A6A6A]">Version 1.0.0</small>
          <p className="text-[#6A6A6A] mt-2">
            © 2024 BandhanHeal. All rights reserved.
          </p>
        </Card>
      </div>
    </div>
  );
}
