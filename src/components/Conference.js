import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import classes from "../styles/Box.module.css";

const Conference = (props) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const deleteHandler = async (id) => {
    try {
      const { data, error } = await supabase
        .from("conferences")
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

  const conference = props.confs.map((conf) => (
    <div className={`container ${classes.degree__container}`} key={conf.id}>
      <div style={{ margin: "1rem" }}>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Title</h2>
          <h2 className={classes.degree__name}>{conf.title}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Name</h2>
          <h2 className={classes.degree__name}>{conf.name}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Year</h2>
          <h2 className={classes.degree__name}>{conf.year}</h2>
        </div>

        <button
          className="button primary block"
          onClick={() => {
            deleteHandler(conf.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return <div>{conference}</div>;
};

export default Conference;
