import classes from "../styles/Degree.module.css";
import Link from "next/link";

const DocumentAdmin = (props) => {
  return (
    <div
      className={`container ${classes.degree__container}`}
      key={props.doc.id}
    >
      <div style={{ margin: "1rem" }}>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Title</h2>
          <h2 className={classes.degree__name}>{props.doc.title}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>URL</h2>

          <Link href={props.doc.url} className={classes.degree__name}>
            {props.doc.url}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentAdmin;
