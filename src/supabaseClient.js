import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qcymkjkmlimfhaludlra.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjeW1ramttbGltZmhhbHVkbHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODY4NDQsImV4cCI6MjA3MDc2Mjg0NH0.MuS8xJ9yKCSEc3dSyJEiNRQbRd98MGXLx2VDd91MLAo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
