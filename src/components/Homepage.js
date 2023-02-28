import Link from "next/link";
import Account from "./Account";
import { useEffect } from "react";
import supabaseAdmin from "@/lib/supabaseAdmin";
import { useUser } from "@supabase/auth-helpers-react";

const Homepage = ({ session }) => {
  const user = useUser();
  console.log("rendering");
  useEffect(() => {
    supabaseAdmin.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabaseAdmin.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);
  const updatePasswordHandler = async () => {
    // const newPassword = prompt('Enter your new password');
    try {
      let { data, error } = await supabaseAdmin.auth.resetPasswordForEmail(
        user.email
      );

      if (!error) {
        alert("Check your email");
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>Homepage</div>
        <Link href={"/home/qualifications"}>Qualifications</Link>
        <Link href={"/home/journals"}>Journals</Link>
        <Link href={"/home/conferences"}>Conferences</Link>
        <Link href={"/home/documents"}>Documents</Link>
        <button onClick={updatePasswordHandler}>Update Password</button>
      </div>
      <Account session={session} />
    </div>
  );
};

export default Homepage;
