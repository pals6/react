import { createClient } from '@supabase/supabase-js'

const fallbackUrl = 'https://rtjqcrgdcbewipbttaiw.supabase.co'
const fallbackAnonKey = 'sb_publishable_3rpBmUcQY6odKoFuh3-JBg_DSD1MDXU'

const url = import.meta.env.VITE_SUPABASE_URL || fallbackUrl
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackAnonKey

export const supabase = createClient(url, anonKey)
