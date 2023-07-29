"use client";

import Navbar from "@/components/Navbar";

const Account = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default Account;
