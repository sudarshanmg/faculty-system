"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchJournal } from "@/actions/getJournalsByUserId";
import useUploadModal from "@/hooks/useUploadModal";
import Header from "@/components/ui/Header";
import Box from "@/components/Box";
import { Button } from "@/components/ui/button";
import { BounceLoader } from "react-spinners";

export default function Journals() {
  const [loading, setLoading] = useState(false);
  const [journals, setJournals] = useState([]);
  const uploadModal = useUploadModal();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id;
      const docs = await fetchJournal(userId);
      setLoading(false);
      setJournals(docs);
    };
    fetchJournals();
  }, [supabase]);

  const onClick = () => {
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col w-full items-center">
      <header>
        <Header text="Journals" />
      </header>
      <section className="flex flex-col items-center w-4/5">
        <Button onClick={onClick} className="w-4/5 m-4" variant={"outline"}>
          Upload Journal
        </Button>
        {journals.length > 0 ? (
          journals.map((journal) => (
            <div
              key={journal.id}
              className="w-full flex items-center justify-center"
            >
              <Box
                title={journal.title}
                description={journal.description}
                year={journal.year}
                authors={journal.authors}
                url={journal.url}
                journal_path={journal.journal_path}
                journal_id={journal.id}
              />
            </div>
          ))
        ) : loading ? (
          <div>
            <BounceLoader size={20} color="#ffffff" />
          </div>
        ) : (
          <div>No journals</div>
        )}
      </section>
    </div>
  );
}
