import { useRouter } from "next/router";
import supabaseAdmin from "@/lib/supabaseAdmin";
import { useEffect, useState } from "react";
import classes from "../styles/Box.module.css";
import ProfileDetails from "./ProfileDetails";
import Avatar from "./Avatar";

const Adminpage = () => {
  const router = useRouter();
  const [users, setUsers] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [allDetails, setAllDetails] = useState([]);
  const [viewFaculties, setViewFaculties] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  const [uid, setUid] = useState();

  const completeDetailsHandler = (user) => {
    setShowDetails(true);

    const details = [];
    let i = 0;
    for (const key in user) {
      details.push(
        <ProfileDetails key={i} objKey={key} objValue={user[key]} />
      );
      setUid(user.id);
      setAvatarUrl(user.avatar_url);
      i++;
    }
    setAllDetails(details);
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
                  completeDetailsHandler(user);
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

  const deleteFacultyHandler = async () => {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.deleteUser(uid);
      if (error) {
        alert(error);
      }
      if (data) {
        alert("Faculty deleted successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewPublicationsHandler = async () => {};
  const changePasswordHandler = async () => {};

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Options */}
        <button onClick={viewFacultiesHandler}>View Faculties</button>
        <button onClick={viewPublicationsHandler}>View Publications</button>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>

      {/* All faculties */}
      {viewFaculties && !showDetails && users}

      {/* Faculty details */}
      {showDetails && (
        <div className={`container ${classes.degree__container}`}>
          <div style={{ margin: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Avatar uid={uid} url={avatarUrl} hideUpload={true} />
            </div>
            {allDetails}
            <button className="block danger" onClick={deleteFacultyHandler}>
              Delete Faculty
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminpage;
