import classes from "../styles/Degree.module.css";
import { useState } from "react";

const JournalAdmin = (props) => {
  console.log(props);
  return (
    <div
      className={`container ${classes.degree__container}`}
      key={props.journal.id}
    >
      <div style={{ margin: "1rem" }}>
        {props.showName && (
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Author</h2>
            <h2 className={classes.degree__name}>{props.username}</h2>
          </div>
        )}

        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Title</h2>
          <h2 className={classes.degree__name}>{props.journal.title}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Name</h2>
          <h2 className={classes.degree__name}>{props.journal.name}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Year</h2>
          <h2 className={classes.degree__name}>{props.journal.year}</h2>
        </div>
      </div>
    </div>
  );
};

export default JournalAdmin;
