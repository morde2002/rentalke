-- Test migration: Add a comment to properties table
-- This is a safe change that just adds documentation

COMMENT ON TABLE public.properties IS 'Main table storing all rental property listings across Kenya';
