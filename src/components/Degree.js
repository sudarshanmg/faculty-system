import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import classes from "../styles/Box.module.css";

const Degree = (props) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const deleteHandler = async (id) => {
    try {
      const { data, error } = await supabase
        .from("qualifications")
        .delete()
        .eq("id", id);
      if (!error) {
        console.log(data);
        alert("Deleted Successfully!");
        router.reload(window.location.pathname);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const degrees = props.degrees.map((deg) => (
    <div className={`container ${classes.degree__container}`} key={deg.id}>
      <div style={{ margin: "1rem" }}>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Degree</h2>
          <h2 className={classes.degree__name}>{deg.degree}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Subject</h2>
          <h2 className={classes.degree__name}>{deg.subject}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>University</h2>
          <h2 className={classes.degree__name}>{deg.university}</h2>
        </div>

        <button
          className="button primary block"
          onClick={() => {
            deleteHandler(deg.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return <div>{degrees}</div>;
};

export default Degree;
