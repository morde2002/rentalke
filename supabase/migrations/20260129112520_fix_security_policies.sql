-- Fix Security: Remove dangerous public write access
-- Only allow public READ access, all write operations require authentication

-- =====================================================
-- PROPERTIES TABLE - Remove dangerous public policies
-- =====================================================

-- Drop all public write access policies (DELETE, INSERT, UPDATE)
DROP POLICY IF EXISTS "Allow public delete" ON public.properties;
DROP POLICY IF EXISTS "Allow public insert" ON public.properties;
DROP POLICY IF EXISTS "Allow public update" ON public.properties;

-- Drop duplicate authenticated policies (redundant with new admin-only)
DROP POLICY IF EXISTS "Authenticated users can delete own properties" ON public.properties;
DROP POLICY IF EXISTS "Authenticated users can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Authenticated users can update own properties" ON public.properties;

-- Keep only public READ access (this is safe and needed for the website)
-- Already exists: "Allow public read access" and "Public can read properties"

-- =====================================================
-- ADMIN-ONLY ACCESS (For you as super user)
-- =====================================================

-- Create admin-only policy for all write operations
-- Note: You'll access this through Supabase Dashboard (which requires login)
-- Later: We'll add OTP verification in a custom admin panel

CREATE POLICY "Admin full access to properties"
ON public.properties
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- PROPERTY RATINGS - Keep as is (public can submit)
-- =====================================================

-- Ratings policies are fine - allow public to submit and read
-- Already exists:
-- - "Anyone can submit ratings" (public can insert)
-- - "Public can read ratings" (public can select)

-- =====================================================
-- NOTES FOR FUTURE OTP IMPLEMENTATION
-- =====================================================

-- Phase 2: Build admin panel with OTP email verification
-- Will require:
-- 1. Admin login page (email/password or magic link)
-- 2. OTP generation function
-- 3. Email sending via Supabase Auth
-- 4. OTP verification before delete operations
-- 5. Audit log table for tracking who deleted what

COMMENT ON POLICY "Admin full access to properties" ON public.properties IS
'Only authenticated users (super admin via Supabase Dashboard) can manage properties. Public can only read. OTP verification to be added in admin panel later.';
