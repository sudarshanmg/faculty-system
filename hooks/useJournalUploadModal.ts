import { create } from "zustand";

interface UploadModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useJournalUploadModal = create<UploadModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useJournalUploadModal;
