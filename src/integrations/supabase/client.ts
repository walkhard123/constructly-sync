import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oggvqzrftgdciarchsoh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZ3ZxenJmdGdkY2lhcmNoc29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwNDI0MDAsImV4cCI6MjAyMDYxODQwMH0.RN_LqXEPOUZxOcYzQEOEEF_dCT_PBZ4xhxBGqQrdEYE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);