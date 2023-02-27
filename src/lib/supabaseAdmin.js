import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service_key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

const supabaseAdmin = createClient(supabaseUrl, service_key);

export default supabaseAdmin;
