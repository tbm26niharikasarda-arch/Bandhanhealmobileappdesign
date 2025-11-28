import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Create Supabase client for server-side operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Health check
app.get('/make-server-aefc5d02/health', (c) => {
  return c.json({ status: 'ok', message: 'BandhanHeal server is running' });
});

// Sign Up Route
app.post('/make-server-aefc5d02/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, relationshipStatus } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        relationshipStatus
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Sign up error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name
      }
    });
  } catch (error) {
    console.log(`Sign up exception: ${error}`);
    return c.json({ error: 'Internal server error during sign up' }, 500);
  }
});

// Save/Update Profile Route
app.post('/make-server-aefc5d02/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { name, partnerName, phone, issues, preferredMode, budget, location } = body;

    // Save profile to KV store
    const profileKey = `profile:${user.id}`;
    await kv.set(profileKey, JSON.stringify({
      userId: user.id,
      name,
      partnerName,
      phone,
      issues,
      preferredMode,
      budget,
      location,
      updatedAt: new Date().toISOString()
    }));

    return c.json({ success: true, message: 'Profile saved successfully' });
  } catch (error) {
    console.log(`Profile save error: ${error}`);
    return c.json({ error: 'Internal server error while saving profile' }, 500);
  }
});

// Get Profile Route
app.get('/make-server-aefc5d02/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profileKey = `profile:${user.id}`;
    const profileData = await kv.get(profileKey);
    
    if (!profileData) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json({ success: true, profile: JSON.parse(profileData) });
  } catch (error) {
    console.log(`Profile fetch error: ${error}`);
    return c.json({ error: 'Internal server error while fetching profile' }, 500);
  }
});

// Save Booking Route
app.post('/make-server-aefc5d02/booking', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { therapistId, therapistName, date, time, mode, clinicAddress, sessionLink } = body;

    if (!therapistId || !date || !time || !mode) {
      return c.json({ error: 'Missing required booking fields' }, 400);
    }

    const bookingId = `booking:${user.id}:${Date.now()}`;
    await kv.set(bookingId, JSON.stringify({
      userId: user.id,
      therapistId,
      therapistName,
      date,
      time,
      mode,
      clinicAddress,
      sessionLink,
      status: 'Upcoming',
      createdAt: new Date().toISOString()
    }));

    return c.json({ 
      success: true, 
      message: 'Booking saved successfully',
      bookingId 
    });
  } catch (error) {
    console.log(`Booking save error: ${error}`);
    return c.json({ error: 'Internal server error while saving booking' }, 500);
  }
});

// Get User Bookings Route
app.get('/make-server-aefc5d02/bookings', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const bookingPrefix = `booking:${user.id}:`;
    const bookings = await kv.getByPrefix(bookingPrefix);
    
    const parsedBookings = bookings.map((booking: string) => JSON.parse(booking));

    return c.json({ success: true, bookings: parsedBookings });
  } catch (error) {
    console.log(`Bookings fetch error: ${error}`);
    return c.json({ error: 'Internal server error while fetching bookings' }, 500);
  }
});

// Update Booking Status
app.put('/make-server-aefc5d02/booking/:id/status', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const bookingId = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    const bookingData = await kv.get(bookingId);
    if (!bookingData) {
      return c.json({ error: 'Booking not found' }, 404);
    }

    const booking = JSON.parse(bookingData);
    booking.status = status;
    booking.updatedAt = new Date().toISOString();

    await kv.set(bookingId, JSON.stringify(booking));

    return c.json({ success: true, message: 'Booking status updated' });
  } catch (error) {
    console.log(`Booking update error: ${error}`);
    return c.json({ error: 'Internal server error while updating booking' }, 500);
  }
});

// Save Session Notes
app.post('/make-server-aefc5d02/notes', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { bookingId, notes, actionItems } = body;

    const noteId = `note:${user.id}:${bookingId}`;
    await kv.set(noteId, JSON.stringify({
      userId: user.id,
      bookingId,
      notes,
      actionItems,
      createdAt: new Date().toISOString()
    }));

    return c.json({ success: true, message: 'Notes saved successfully' });
  } catch (error) {
    console.log(`Notes save error: ${error}`);
    return c.json({ error: 'Internal server error while saving notes' }, 500);
  }
});

// Get Session Notes
app.get('/make-server-aefc5d02/notes', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const notePrefix = `note:${user.id}:`;
    const notes = await kv.getByPrefix(notePrefix);
    
    const parsedNotes = notes.map((note: string) => JSON.parse(note));

    return c.json({ success: true, notes: parsedNotes });
  } catch (error) {
    console.log(`Notes fetch error: ${error}`);
    return c.json({ error: 'Internal server error while fetching notes' }, 500);
  }
});

// Save Progress Data
app.post('/make-server-aefc5d02/progress', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { week, mood, satisfaction, notes } = body;

    const progressId = `progress:${user.id}:${week}`;
    await kv.set(progressId, JSON.stringify({
      userId: user.id,
      week,
      mood,
      satisfaction,
      notes,
      createdAt: new Date().toISOString()
    }));

    return c.json({ success: true, message: 'Progress saved successfully' });
  } catch (error) {
    console.log(`Progress save error: ${error}`);
    return c.json({ error: 'Internal server error while saving progress' }, 500);
  }
});

// Get Progress Data
app.get('/make-server-aefc5d02/progress', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const progressPrefix = `progress:${user.id}:`;
    const progressData = await kv.getByPrefix(progressPrefix);
    
    const parsedProgress = progressData.map((progress: string) => JSON.parse(progress));

    return c.json({ success: true, progress: parsedProgress });
  } catch (error) {
    console.log(`Progress fetch error: ${error}`);
    return c.json({ error: 'Internal server error while fetching progress' }, 500);
  }
});

Deno.serve(app.fetch);
