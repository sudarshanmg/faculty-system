import classes from "../styles/Box.module.css";

const ProfileDetails = ({ objKey, objValue }) => {
  return (
    <>
      {objKey !== "avatar_url" && objKey !== "updated_at" && (
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>{objKey.toUpperCase()}</h2>
          <h2 className={classes.degree__name}>{objValue}</h2>
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
