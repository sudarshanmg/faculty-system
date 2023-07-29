import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";

type updateProfileStore = {
  id: string | null | undefined;
  username: string | null;
  fullName: string | null;
  dob: string | null;
  aadhaar: string | number | null;
  experience: string | number | null;
  pan: string | null;
  avatar_url: string | null;
};

export async function updateProfile({
  id,
  username,
  fullName,
  dob,
  aadhaar,
  experience,
  pan,
  avatar_url,
}: updateProfileStore) {
  const supabase = createClientComponentClient();

  try {
    let { error } = await supabase.from("profiles").upsert({
      id: id,
      full_name: fullName,
      username,
      dob,
      aadhaar,
      experience,
      pan,
      avatar_url,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    toast.success("Profile updated!");
  } catch (error) {
    console.log(error);
  }
}
