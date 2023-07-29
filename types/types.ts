export interface UserDetails {
  aadhaar?: number | null;
  address?: string | null;
  admin?: boolean | null;
  avatar_url?: string | null;
  community?: string | null;
  dob?: string | null;
  experience?: number | null;
  full_name?: string | null;
  id: string;
  joining_date?: string | null;
  mobile?: number | null;
  pan?: string | null;
  religion?: string | null;
  sex?: string | null;
  username?: string | null;
  website?: string | null;
}

export interface JournalDetails {
  authors?: string | null;
  created_at?: string | null;
  description?: string | null;
  id?: number;
  journal_path?: string | null;
  title?: string | null;
  url?: string | null;
  user_id?: string | null;
  year?: number | null;
}
