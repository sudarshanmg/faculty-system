import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";

export const deleteQualificationFile = async (
  qualification_path: string,
  qualification_id: string
) => {
  const supabase = createClientComponentClient();

  try {
    // Delete the qualification file from the storage bucket
    if (qualification_path !== undefined || qualification_path !== null) {
      const { error: fileError } = await supabase.storage
        .from("qualifications")
        .remove([qualification_path]);
      if (fileError) console.log("error", fileError);
    }

    try {
      // Delete the entry from the qualifications table
      const { error: dataError } = await supabase
        .from("qualifications")
        .delete()
        .eq("id", qualification_id);
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
