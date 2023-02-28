import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import classes from "../styles/Box.module.css";

const Journal = (props) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const deleteHandler = async (id) => {
    try {
      const { data, error } = await supabase
        .from("journals")
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

  const journals = props.journals.map((journal) => (
    <div className={`container ${classes.degree__container}`} key={journal.id}>
      <div style={{ margin: "1rem" }}>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Title</h2>
          <h2 className={classes.degree__name}>{journal.title}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Name</h2>
          <h2 className={classes.degree__name}>{journal.name}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Year</h2>
          <h2 className={classes.degree__name}>{journal.year}</h2>
        </div>

        <button
          className="button primary block"
          onClick={() => {
            deleteHandler(journal.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return <div>{journals}</div>;
};

export default Journal;
