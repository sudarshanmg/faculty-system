"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Actions
import { fetchQualification } from "@/actions/getQualificationsByUserId";

// Hooks
import { useEffect, useState } from "react";
import useQualificationUploadModal from "@/hooks/useQualificationUploadModal";

// UI
import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { BounceLoader } from "react-spinners";
import QualificationBox from "@/components/QualificationBox";

export default function Qualifications() {
  const [loading, setLoading] = useState(false);
  const [qualifications, setQualifications] = useState([]);
  const uploadModal = useQualificationUploadModal();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchQualifications = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id;
      const docs = await fetchQualification(userId);
      setLoading(false);
      setQualifications(docs);
    };
    fetchQualifications();
  }, [supabase]);

  const onClick = () => {
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col w-full items-center">
      <header>
        <Header text="Qualifications" />
      </header>
      <section className="flex flex-col items-center w-4/5">
        <Button onClick={onClick} className="w-4/5 m-4" variant={"outline"}>
          Upload File
        </Button>
        {qualifications.length > 0 ? (
          qualifications.map((qualification) => (
            <div
              key={qualification.id}
              className="w-full flex items-center justify-center"
            >
              <QualificationBox
                title={qualification.title}
                subject={qualification.subject}
                year={qualification.year}
                qualification_path={qualification.qualification_path}
                qualification_id={qualification.id}
              />
            </div>
          ))
        ) : loading ? (
          <div>
            <BounceLoader size={20} color="#ffffff" />
          </div>
        ) : (
          <div>Nothing added.</div>
        )}
      </section>
    </div>
  );
}
