-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('student', 'faculty', 'club');

-- Create enum for notice categories
CREATE TYPE public.notice_category AS ENUM ('academic', 'event', 'club', 'urgent', 'general');

-- Create enum for event types
CREATE TYPE public.event_type AS ENUM ('academic', 'festival', 'club', 'recruitment', 'workshop', 'seminar');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.user_role NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create student_profiles table
CREATE TABLE public.student_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  semester INTEGER NOT NULL,
  branch TEXT NOT NULL,
  roll_number TEXT UNIQUE,
  interests TEXT[],
  tokens INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create faculty_profiles table
CREATE TABLE public.faculty_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  department TEXT NOT NULL,
  designation TEXT,
  subjects TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create club_profiles table
CREATE TABLE public.club_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  club_name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  social_links JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type public.event_type NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  organizer_id UUID REFERENCES public.profiles(id),
  poster_url TEXT,
  registration_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create notices table
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category public.notice_category NOT NULL,
  author_id UUID REFERENCES public.profiles(id),
  department TEXT,
  is_urgent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum_channels table
CREATE TABLE public.forum_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  channel_type TEXT NOT NULL, -- 'prep', 'doubt', 'club', 'general'
  faculty_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create forum_posts table
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES public.forum_channels(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  attachments JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create timetables table
CREATE TABLE public.timetables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester INTEGER NOT NULL,
  branch TEXT NOT NULL,
  day_of_week INTEGER NOT NULL, -- 0-6 (Sunday-Saturday)
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  subject TEXT NOT NULL,
  faculty_id UUID REFERENCES public.profiles(id),
  room_location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.student_profiles(id),
  subject TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL, -- 'present', 'absent', 'late'
  faculty_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create token_transactions table
CREATE TABLE public.token_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.student_profiles(id),
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  certificate_url TEXT,
  approved_by UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for student_profiles
CREATE POLICY "Students can view all student profiles"
  ON public.student_profiles FOR SELECT
  USING (true);

CREATE POLICY "Students can update their own profile"
  ON public.student_profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for events (public read)
CREATE POLICY "Everyone can view events"
  ON public.events FOR SELECT
  USING (true);

CREATE POLICY "Clubs and faculty can create events"
  ON public.events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

-- RLS Policies for notices (public read)
CREATE POLICY "Everyone can view notices"
  ON public.notices FOR SELECT
  USING (true);

CREATE POLICY "Faculty can create notices"
  ON public.notices FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- RLS Policies for forums (public read)
CREATE POLICY "Everyone can view forum channels"
  ON public.forum_channels FOR SELECT
  USING (true);

CREATE POLICY "Everyone can view forum posts"
  ON public.forum_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON public.forum_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- RLS Policies for timetables
CREATE POLICY "Everyone can view timetables"
  ON public.timetables FOR SELECT
  USING (true);

-- RLS Policies for attendance
CREATE POLICY "Students can view their own attendance"
  ON public.attendance FOR SELECT
  USING (auth.uid() = student_id);

-- RLS Policies for token transactions
CREATE POLICY "Students can view their own tokens"
  ON public.token_transactions FOR SELECT
  USING (auth.uid() = student_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();