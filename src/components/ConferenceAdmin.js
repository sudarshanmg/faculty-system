import React from "react";

import classes from "../styles/Degree.module.css";

const ConferenceAdmin = (props) => {
  return (
    <div
      className={`container ${classes.degree__container}`}
      key={props.conf.id}
    >
      <div style={{ margin: "1rem" }}>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Name</h2>
          <h2 className={classes.degree__name}>{props.username}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Title</h2>
          <h2 className={classes.degree__name}>{props.conf.title}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Name</h2>
          <h2 className={classes.degree__name}>{props.conf.name}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Year</h2>
          <h2 className={classes.degree__name}>{props.conf.year}</h2>
        </div>
      </div>
    </div>
  );
};

export default ConferenceAdmin;
