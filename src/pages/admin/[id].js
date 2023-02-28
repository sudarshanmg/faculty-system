import { useRouter } from "next/router";
import supabaseAdmin from "@/lib/supabaseAdmin";
import { useEffect, useState } from "react";
import classes from "../../styles/Box.module.css";

const User = ({ id }) => {
  const [facultyDetails, setFacultyDetails] = useState({});

  useEffect(() => {
    const getFacultyDetails = async (id) => {
      try {
        let { data, error, status } = await supabaseAdmin
          .from("profiles")
          .select(`*`)
          .eq("id", id);

        if (error && status !== 406) {
          throw error;
        }
        if (data) {
          console.log(data);
          setFacultyDetails(() => {
            return data;
          });
          console.log(facultyDetails);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getFacultyDetails(id);
  }, []);
  console.log(id);
  return <div>{"admin"}</div>;
};

export default User;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
}
export async function getStaticProps(context) {
  const id = context.params.id;
  return {
    props: { id }, // will be passed to the page component as props
  };
}
