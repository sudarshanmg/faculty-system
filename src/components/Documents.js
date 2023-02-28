import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "../styles/Degree.module.css";

const Document = (props) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const deleteHandler = async (id) => {
    try {
      const { data, error } = await supabase
        .from("documents")
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

  console.log(props);

  const documents = props.docs.map((doc) => (
    <div className={`container ${classes.degree__container}`} key={doc.id}>
      <div style={{ margin: "1rem" }}>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>Title</h2>
          <h2 className={classes.degree__name}>{doc.title}</h2>
        </div>
        <div style={{ margin: "1rem auto" }}>
          <h2 className={classes.degree__title}>URL</h2>

          <Link href={doc.url} className={classes.degree__name}>
            {doc.url}
          </Link>
        </div>

        <button
          className="button primary block"
          onClick={() => {
            deleteHandler(doc.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return <div>{documents}</div>;
};

export default Document;
