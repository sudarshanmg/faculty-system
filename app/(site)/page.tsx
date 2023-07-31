"use client";

// Helpers
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import { useSessionContext } from "@supabase/auth-helpers-react";

// Hooks
import useAuthModal from "@/hooks/useAuthModal";

// UI
import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  const authModal = useAuthModal();
  const router = useRouter();
  const { session } = useSessionContext();

  return (
    <>
      {/* Check if there is session */}
      {!session ? (
        <div className="flex flex-col items-center justify-center h-screen w-full">
          <div className="flex items-center justify-center">
            <Header text="Welcome to FIS" />
          </div>
          <div>
            <Button
              className="sm:w-fit my-12 text-xs sm:text-sm h-8 md:h-auto"
              onClick={authModal.onOpen}
            >
              <h1 className="text-xs sm:text-base">Account</h1>
              <span className="ml-1">
                <MoveRight size={15} />
              </span>
            </Button>
          </div>
        </div>
      ) : (
        router.push("/account")
      )}
    </>
  );
}
