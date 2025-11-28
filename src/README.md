# BandhanHeal - Marriage Therapy & Couple Wellness App

A comprehensive mobile-first web application for marriage therapy and couples counseling, inspired by Amaha but focused solely on relationships.

## 🌿 Design Philosophy

**Calming Shade.com-inspired Theme:**
- Warm greys (#F4EFEA, #E6E2DD)
- Lavender mist (#CFC9D9)
- Soft beige with muted purple accents (#BBB7C5, #A892C4, #8B7AA8)
- Gentle gradients
- Rounded shapes
- Premium minimal design
- Emotionally safe and comforting UI tone

## 📱 Application Structure

### Complete Screen Flow (15+ Screens)

1. **Landing/Welcome Screen** - Introduction with "Get Started" and "Login" options
2. **Login Screen** - Email/password + Google OAuth authentication
3. **Sign Up Screen** - Account creation with relationship status
4. **Profile Setup** - Comprehensive profile creation with therapy goals
5. **Dashboard** - Home screen with quick actions and upcoming sessions
6. **Therapist Directory** - Browse and filter therapist listings
7. **Therapist Profile** - Detailed therapist information and reviews
8. **Booking Screen** - Select mode, date, and time for sessions
9. **Booking Confirmation** - Success screen with session details
10. **Session Detail** - View session information and join links
11. **Progress Page** - Track therapy journey with metrics and charts
12. **Notes Page** - View session notes and action items
13. **Settings Page** - Profile editing, preferences, and logout
14. **About Page** - App mission, approach, and contact information
15. **Email Notification Mock** - Simulated email notifications

### Navigation System

- **Bottom Tab Navigation** on main screens:
  - Home (Dashboard)
  - Book (Therapist Directory)
  - Progress
  - Notes
  - Profile (Settings)

- **Screen Transitions** with intuitive back buttons and flow

## 🔐 Supabase Integration

### Authentication (Supabase Auth)

**Features Implemented:**
- Email + password sign up
- Email + password login
- Google OAuth login (requires configuration)
- Secure logout with confirmation
- Session management
- Protected routes requiring authentication

**Auth Flow:**
1. User signs up → `POST /make-server-aefc5d02/signup`
2. Account created with `email_confirm: true` (auto-confirmed)
3. Login → Supabase `signInWithPassword()`
4. Access token stored and used for authenticated requests
5. Logout → Supabase `signOut()`

### Database (Supabase KV Store)

**Data Models:**

1. **Profiles Table** (`profile:{userId}`)
   - User information
   - Partner name
   - Issues to work on (multi-select)
   - Preferred mode (Online/Offline/Hybrid)
   - Budget preference
   - Location

2. **Bookings Table** (`booking:{userId}:{timestamp}`)
   - Therapist information
   - Date and time
   - Mode (Online/Offline)
   - Status (Upcoming/Completed)
   - Session link or clinic address

3. **Notes Table** (`note:{userId}:{bookingId}`)
   - Session notes from therapist
   - Action items
   - Recommendations

4. **Progress Table** (`progress:{userId}:{week}`)
   - Weekly mood ratings
   - Relationship satisfaction scores
   - Personal reflections

### API Endpoints

```
POST   /make-server-aefc5d02/signup          - Create new user account
POST   /make-server-aefc5d02/profile         - Save/update user profile
GET    /make-server-aefc5d02/profile         - Get user profile
POST   /make-server-aefc5d02/booking         - Create new booking
GET    /make-server-aefc5d02/bookings        - Get user's bookings
PUT    /make-server-aefc5d02/booking/:id/status - Update booking status
POST   /make-server-aefc5d02/notes           - Save session notes
GET    /make-server-aefc5d02/notes           - Get session notes
POST   /make-server-aefc5d02/progress        - Save progress data
GET    /make-server-aefc5d02/progress        - Get progress data
```

### Security

- All authenticated endpoints verify access token
- Service role key used only on server side
- CORS configured for secure requests
- User data isolated by userId

## 🎨 Component Library

### Core Components

- **Button** - Primary, secondary, and ghost variants
- **Input** - Text inputs with labels and error states
- **Card** - Container component with hover states
- **Modal** - Bottom sheet modal with actions
- **Toast** - Success and error toast notifications
- **BottomNav** - Bottom navigation bar with active states

### Screen Components

All screens are self-contained components with proper state management and navigation.

## 🚀 Features

### User Experience
- ✅ Responsive mobile-first design
- ✅ Smooth animations and transitions
- ✅ Loading states during async operations
- ✅ Error handling with user-friendly messages
- ✅ Success confirmations
- ✅ Form validation

### Authentication & Profile
- ✅ Email/password authentication
- ✅ Google OAuth (requires setup)
- ✅ Profile creation and editing
- ✅ Relationship status tracking
- ✅ Therapy goal selection

### Therapist Booking
- ✅ Therapist directory with filters
- ✅ Online/Offline mode selection
- ✅ Date and time picker
- ✅ Booking confirmation
- ✅ Session details with join links
- ✅ Mark sessions as completed

### Progress Tracking
- ✅ Session completion count
- ✅ Mood tracker with visualizations
- ✅ Relationship satisfaction scale
- ✅ Weekly reflections
- ✅ Progress charts

### Notes & Recommendations
- ✅ Session notes from therapist
- ✅ Action items with checkboxes
- ✅ Personalized recommendations
- ✅ Historical session records

### Settings & Preferences
- ✅ Profile editing
- ✅ Notification preferences
- ✅ Email reminder settings
- ✅ Google Calendar sync toggle
- ✅ Secure logout with confirmation

## 🔧 Technical Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS v4.0
- **Backend:** Supabase (Auth + Database)
- **Server:** Hono on Deno (Edge Functions)
- **Icons:** Lucide React
- **State Management:** React useState

## 📊 UI States Implemented

### Authentication States
- Loading during login/signup
- Error messages for invalid credentials
- Success modal on account creation
- Password validation (min 6 characters)
- Email format validation

### Booking States
- Date/time selection
- Mode toggle (Online/Offline)
- Booking summary preview
- Loading during confirmation
- Success confirmation with details
- "Saved to Supabase" indicator

### Session States
- Upcoming vs Completed status
- Session detail view
- Join session link (Online mode)
- Clinic address (Offline mode)
- Mark as completed action
- Update confirmation

### Error States
- Connection error modal
- "Could not connect to server" message
- Retry functionality
- Form validation errors
- Authentication errors

## 📧 Email Notifications (Mocked)

Three types of email notifications are designed:
1. **Session Reminder** - 24 hours before session
2. **Booking Confirmation** - Immediately after booking
3. **Follow-up Message** - After session with notes

## 🎯 Mock Data

The application uses realistic mock data for demonstration:
- 4 therapists with different specializations
- Sample bookings with various statuses
- Progress tracking data
- Session notes and action items
- Weekly reflections

## 🔒 Privacy & Security Notes

**Important Notice:**
This application is designed for relationship counseling and wellness prototyping. It is **not intended** for:
- Collecting highly sensitive personally identifiable information (PII)
- Clinical mental health emergency situations
- HIPAA-compliant healthcare data

For production use, additional security measures would be required:
- End-to-end encryption
- HIPAA compliance
- Enhanced data protection
- Professional liability coverage

## 🌐 Google OAuth Setup

To enable Google login:
1. Visit [Supabase Auth Documentation](https://supabase.com/docs/guides/auth/social-login/auth-google)
2. Configure Google OAuth in your Supabase project
3. Add authorized redirect URLs
4. Update app credentials

## 🎨 Color Palette

```css
--warm-neutral: #F4EFEA
--soft-beige: #E6E2DD
--lavender-haze: #CFC9D9
--soft-grey-purple: #BBB7C5
--cool-grey-blue: #9EA7B2
--muted-purple: #A892C4
--deep-purple: #8B7AA8
--success-green: #7DBB9F
--error-red: #D88B8B
```

## 🏃‍♂️ Getting Started

The application is ready to run. Simply navigate through the screens starting from the Landing page.

**Demo Flow:**
1. Start at Landing Screen
2. Click "Sign Up" to create an account
3. Complete profile setup
4. Browse therapist directory
5. Book a session
6. View dashboard with upcoming sessions
7. Track progress and view notes

## 📱 Responsive Design

- Mobile-first approach
- Max-width containers for larger screens
- Touch-friendly interactive elements
- Bottom navigation for easy thumb access
- Rounded corners and comfortable spacing

## ✨ Premium Features

- Gradient backgrounds on header sections
- Smooth transitions and hover states
- Thoughtful empty states
- Comprehensive loading indicators
- Friendly error messages
- Confirmation modals for destructive actions

---

**BandhanHeal** - Healing Bonds, Building Futures 💜

*Version 1.0.0*
