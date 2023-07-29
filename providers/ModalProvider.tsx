"use client";

import AuthModal from "@/components/AuthModal";
import JournalUploadModal from "@/components/JournalUploadModal";
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
    </>
  );
};

export default ModalProvider;
