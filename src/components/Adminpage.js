import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import supabaseAdmin from "@/lib/supabaseAdmin";
import { useEffect, useState } from "react";
import classes from "../styles/Degree.module.css";

import { setUid } from "@/store/uidSlice";

const Adminpage = () => {
  const router = useRouter();
  const uid = useSelector((state) => state.uid.value);

  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  const [viewFaculties, setViewFaculties] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  // const [uid, setUid] = useState();

  const completeDetailsHandler = () => {
    router.push(`/admin/${uid}`);
  };

  const viewFacultiesHandler = async () => {
    setShowDetails(false);
    const { data, error } = await supabaseAdmin.from("profiles").select("*");
    if (data) {
      setUsers(
        data.map((user) => (
          <div
            className={`container ${classes.degree__container}`}
            key={user.id}
          >
            <div style={{ margin: "1rem" }}>
              <div style={{ margin: "1rem auto" }}>
                <h2 className={classes.degree__title}>Faculty</h2>
                <h2 className={classes.degree__name}>{user.username}</h2>
              </div>
              <div style={{ margin: "1rem auto" }}>
                <h2 className={classes.degree__title}>Mobile</h2>
                <h2 className={classes.degree__name}>{user.mobile}</h2>
              </div>
              <button
                className="button primary block"
                onClick={() => {
                  dispatch(setUid(user.id));
                  completeDetailsHandler();
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        ))
      );
    }
    setViewFaculties(true);
  };

  const viewPublicationsHandler = () => {
    router.push("/admin/publications");
  };
  const changePasswordHandler = async () => {
    const newPassword = prompt("Enter new Password");
    const updates = {
      id: 1,
      pass: newPassword,
    };

    let { error } = await supabaseAdmin.from("elevate").upsert(updates);
    if (!error) {
      alert("Password updated successfully!");
    }
    if (error) {
      console.log(error);
    }
  };

  const signOutHandler = () => {
    sessionStorage.removeItem("signedIn");
    router.replace("/");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Options */}
        <button onClick={viewFacultiesHandler}>View Faculties</button>
        <button onClick={viewPublicationsHandler}>View Publications</button>
        <button onClick={changePasswordHandler}>Change Password</button>
        <button onClick={signOutHandler}>Sign Out</button>
      </div>

      {/* All faculties */}
      {viewFaculties && users}
    </div>
  );
};

export default Adminpage;
