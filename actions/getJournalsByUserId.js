import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const fetchJournal = async (userId) => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("journals")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("user_id", userId);

  if (error) console.log("error", error);
  else return data;
};
