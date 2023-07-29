import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const deleteJournalFile = async (
  journal_path: string,
  journal_id: string
) => {
  const supabase = createClientComponentClient();

  try {
    if (journal_path !== undefined || journal_path !== null) {
      const { error: fileError } = await supabase.storage
        .from("journals")
        .remove([journal_path]);
      if (fileError) console.log("error", fileError);
    }

    try {
      const { error: dataError } = await supabase
        .from("journals")
        .delete()
        .eq("id", journal_id);
      if (dataError) console.log(dataError);
      else {
        toast.success("Deleted!");
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};
