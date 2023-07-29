import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { UserDetails } from "@/types/types";

const getUserDetailsByUserId = async (): Promise<UserDetails | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", sessionData.session?.user.id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getUserDetailsByUserId;
