import classes from "../styles/Degree.module.css";

const DegreeAdmin = (props) => {
  return (
    <>
      <div
        className={`container ${classes.degree__container}`}
        key={props.degree.id}
      >
        <div style={{ margin: "1rem" }}>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Degree</h2>
            <h2 className={classes.degree__name}>{props.degree.degree}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Subject</h2>
            <h2 className={classes.degree__name}>{props.degree.subject}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>University</h2>
            <h2 className={classes.degree__name}>{props.degree.university}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default DegreeAdmin;
