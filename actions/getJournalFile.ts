import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getJournalFile = async (
  journal_path: string,
  setLoading: (arg0: boolean) => void
) => {
  const supabase = createClientComponentClient();

  try {
    setLoading(true);
    const { data: file, error } = await supabase.storage
      .from("journals")
      .download(journal_path);
    if (error) console.log("error", error);

    const url = URL.createObjectURL(file as Blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file?.name!;
    a.click();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
