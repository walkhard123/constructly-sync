import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oggvqzrftgdciarchsoh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZ3ZxenJmdGdkY2lhcmNoc29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0OTY5MDksImV4cCI6MjA1MjA3MjkwOX0.SRyPdD1B9myiuub3MxtJpMOMk6Gq3WjsBtXUjS34YQw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);