-- ==============================================================================
-- MILAGRES PU COLLEGE CMS - SUPABASE SCHEMA & POLICIES
-- Run this entire script in your Supabase SQL Editor
-- ==============================================================================

-- 1. Enable pgcrypto for UUIDs if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- TABLE CREATION
-- ==============================================================================

-- Global Settings (Admission Link, Principal Message, etc.)
CREATE TABLE IF NOT EXISTS global_settings (
  id integer PRIMARY KEY DEFAULT 1,
  admission_form_link text,
  principal_name text DEFAULT 'Fr. Principal',
  principal_message text,
  principal_photo_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);
-- Ensure only one row exists
ALTER TABLE global_settings DROP CONSTRAINT IF EXISTS global_settings_single_row;
ALTER TABLE global_settings ADD CONSTRAINT global_settings_single_row CHECK (id = 1);
INSERT INTO global_settings (id, admission_form_link, principal_message) 
VALUES (1, '#', 'Welcome to Milagres PU College.') 
ON CONFLICT (id) DO NOTHING;

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Academic Excellence
CREATE TABLE IF NOT EXISTS academic_excellence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  stream text NOT NULL,
  marks text NOT NULL,
  academic_year text NOT NULL,
  photo_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- News & Events
CREATE TABLE IF NOT EXISTS news_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('news', 'event')),
  title text NOT NULL,
  content text NOT NULL,
  featured_image_url text,
  event_date date,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  stream text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Faculty
CREATE TABLE IF NOT EXISTS faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  department text NOT NULL,
  photo_url text,
  is_leadership boolean DEFAULT false,
  display_order integer DEFAULT 100,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Facilities
CREATE TABLE IF NOT EXISTS facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Careers
CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  deadline date,
  is_open boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Gallery Albums
CREATE TABLE IF NOT EXISTS gallery_albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Gallery Photos
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id uuid REFERENCES gallery_albums(id) ON DELETE CASCADE,
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- We want everyone to be able to SELECT (Read) the data for the public website.
-- Only authenticated users (Admins) can INSERT, UPDATE, DELETE.

ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_excellence ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Helper function to create policies
CREATE OR REPLACE FUNCTION enable_public_read_admin_write(table_name text) RETURNS void AS $$
BEGIN
    EXECUTE format('DROP POLICY IF EXISTS "Allow public read on %I" ON %I', table_name, table_name);
    EXECUTE format('CREATE POLICY "Allow public read on %I" ON %I FOR SELECT USING (true)', table_name, table_name);
    
    EXECUTE format('DROP POLICY IF EXISTS "Allow admin insert on %I" ON %I', table_name, table_name);
    EXECUTE format('CREATE POLICY "Allow admin insert on %I" ON %I FOR INSERT TO authenticated WITH CHECK (true)', table_name, table_name);
    
    EXECUTE format('DROP POLICY IF EXISTS "Allow admin update on %I" ON %I', table_name, table_name);
    EXECUTE format('CREATE POLICY "Allow admin update on %I" ON %I FOR UPDATE TO authenticated USING (true)', table_name, table_name);
    
    EXECUTE format('DROP POLICY IF EXISTS "Allow admin delete on %I" ON %I', table_name, table_name);
    EXECUTE format('CREATE POLICY "Allow admin delete on %I" ON %I FOR DELETE TO authenticated USING (true)', table_name, table_name);
END;
$$ LANGUAGE plpgsql;

SELECT enable_public_read_admin_write('global_settings');
SELECT enable_public_read_admin_write('announcements');
SELECT enable_public_read_admin_write('academic_excellence');
SELECT enable_public_read_admin_write('news_events');
SELECT enable_public_read_admin_write('courses');
SELECT enable_public_read_admin_write('faculty');
SELECT enable_public_read_admin_write('facilities');
SELECT enable_public_read_admin_write('careers');
SELECT enable_public_read_admin_write('gallery_albums');
SELECT enable_public_read_admin_write('gallery_photos');


-- ==============================================================================
-- STORAGE BUCKETS (Create them if they don't exist)
-- ==============================================================================
-- Insert the public buckets into storage.buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true), 
       ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'images'
DROP POLICY IF EXISTS "Public Access for images" ON storage.objects;
CREATE POLICY "Public Access for images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
DROP POLICY IF EXISTS "Auth Insert for images" ON storage.objects;
CREATE POLICY "Auth Insert for images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');
DROP POLICY IF EXISTS "Auth Update for images" ON storage.objects;
CREATE POLICY "Auth Update for images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images');
DROP POLICY IF EXISTS "Auth Delete for images" ON storage.objects;
CREATE POLICY "Auth Delete for images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images');

-- Storage Policies for 'documents'
DROP POLICY IF EXISTS "Public Access for documents" ON storage.objects;
CREATE POLICY "Public Access for documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
DROP POLICY IF EXISTS "Auth Insert for documents" ON storage.objects;
CREATE POLICY "Auth Insert for documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents');
DROP POLICY IF EXISTS "Auth Update for documents" ON storage.objects;
CREATE POLICY "Auth Update for documents" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'documents');
DROP POLICY IF EXISTS "Auth Delete for documents" ON storage.objects;
CREATE POLICY "Auth Delete for documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents');

-- ==============================================================================
-- 7. EVENTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  event_date text NOT NULL,
  event_time text,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

SELECT enable_public_read_admin_write('events');

-- ==============================================================================
-- END OF SCRIPT
-- ==============================================================================
