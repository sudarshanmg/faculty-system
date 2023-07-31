"use client";

import AuthModal from "@/components/AuthModal";
import JournalUploadModal from "@/components/JournalUploadModal";
import QualificationUploadModal from "@/components/QualificationUploadModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <JournalUploadModal />
      <QualificationUploadModal />
    </>
  );
};

export default ModalProvider;
