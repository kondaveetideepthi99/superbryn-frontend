import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://siqreitxeanofthvanhx.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcXJlaXR4ZWFub2Z0aHZhbmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MjgzOTUsImV4cCI6MjA3NzMwNDM5NX0.FPA79ptD7H2UMDBoq7OHOljF2a6Zz2xhWYnKo-WDtoc"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
