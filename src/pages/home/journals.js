import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import Layout from "@/components/Layout";
import Degree from "@/components/Degree";
import Router from "next/router";
import Research from "@/components/Research";
import Link from "next/link";

export default function Journals() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState(null);
  const [title, setTitle] = useState(null);
  const [name, setName] = useState(null);
  const [year, setYear] = useState(null);
  const [storedJournals, setStoredJournals] = useState([]);

  useEffect(() => {
    getJournals();
  }, [session]);

  const getJournals = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("journals")
        .select(`id, title, name, year`)
        .eq("user_id", user.id);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setStoredJournals(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const addJournal = async ({ title, name, year }) => {
    try {
      setLoading(true);

      const updates = {
        user_id: user.id,
        title,
        name,
        year,
      };

      const { data, error } = await supabase.from("journals").insert([updates]);

      if (error) throw error;
      alert("New Journal added successfully!");
      router.reload(window.location.pathname);
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "4em auto",
        }}
        className="container"
      >
        <Link href={"/"}>Homepage</Link>
        <Link href={"/home/qualifications"}>Qualifications</Link>
        <Link href={"/home/journals"}>Journals</Link>
        <Link href={"/home/conferences"}>Conferences</Link>
        <Link href={"/home/documents"}>Documents</Link>
      </div>
      <div style={{ margin: "1rem" }}>
        <h2 className="head_center">Add New Journal</h2>
        <div className="container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            onChange={(e) => setYear(e.target.value)}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            style={{ margin: "1rem auto" }}
            onClick={() =>
              addJournal({
                title,
                name,
                year,
              })
            }
          >
            {loading ? "Loading ..." : "Insert"}
          </button>
        </div>

        <h1 className="head_center">Journals</h1>
        <Research journals={storedJournals} />
      </div>
    </>
  );
}
