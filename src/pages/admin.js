import React, { useRef } from "react";
import { useRouter } from "next/router";
import supabaseAdmin from "@/lib/supabaseAdmin";

const AdminAuth = () => {
  const passwInputRef = useRef();
  const router = useRouter();
  const authenticateAdmin = async () => {
    let { data, error } = await supabaseAdmin.from("elevate").select("*");
    if (data[0].pass === passwInputRef.current.value) {
      sessionStorage.setItem("signedIn", "true");
      router.push("/admin/admin");
    } else {
      alert("wrong passwored");
    }
  };
  return (
    <>
      <label htmlFor="password">Enter password</label>
      <input type="text" name="password" id="password" ref={passwInputRef} />
      <button onClick={() => authenticateAdmin()}>Submit</button>
    </>
  );
};

export default AdminAuth;
