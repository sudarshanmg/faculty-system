import { useEffect, useRef, useState } from "react";
import supabaseAdmin from "@/lib/supabaseAdmin";
import Adminpage from "@/components/Adminpage";
import { useRouter } from "next/router";

const Admin = () => {
  const passwInputRef = useRef();
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("signedIn") !== "true") {
        router.replace("/");
      }
    }
  }, []);

  return (
    <div className="container" style={{ margin: "1rem auto" }}>
      <h1>Welcome Admin</h1>

      <div style={{ margin: "1rem auto" }}>{<Adminpage />}</div>
    </div>
  );
};

export default Admin;
