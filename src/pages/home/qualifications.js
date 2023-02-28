import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import Degree from "@/components/Degree";


export default function Qualifications() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [degree, setDegree] = useState(null);
  const [university, setUniversity] = useState(null);
  const [subject, setSubject] = useState(null);
  const [year, setYear] = useState(null);
  const [storedDegrees, setStoredDegrees] = useState([]);

  useEffect(() => {
    getQualifications();
  }, [session]);

  const getQualifications = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("qualifications")
        .select(`id, degree, subject, university, passing_year`)
        .eq("user_id", user.id);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setStoredDegrees(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const addQualification = async ({ degree, subject, university, year }) => {
    try {
      setLoading(true);

      const updates = {
        user_id: user.id,
        degree,
        subject,
        university,
        passing_year: year,
      };

      const { data, error } = await supabase
        .from("qualifications")
        .insert([updates]);

      if (error) throw error;
      alert("New degree added successfully!");
      router.reload(window.location.pathname);
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "1rem" }}>
      <h2 className="head_center">Add New Qualification</h2>
      <div className="container">
        <label htmlFor="degree">Degree</label>
        <input
          type="text"
          name="degree"
          id="degree"
          onChange={(e) => setDegree(e.target.value)}
        />
        <label htmlFor="subject">subject</label>
        <input
          type="text"
          name="subject"
          id="subject"
          onChange={(e) => setSubject(e.target.value)}
        />
        <label htmlFor="year">Year of Passing</label>
        <input
          type="number"
          name="year"
          id="year"
          onChange={(e) => setYear(e.target.value)}
        />
        <label htmlFor="university">University</label>
        <input
          type="text"
          name="university"
          id="university"
          onChange={(e) => setUniversity(e.target.value)}
        />
        <button
          type="submit"
          style={{ margin: "1rem auto" }}
          onClick={() =>
            addQualification({
              degree,
              subject,
              university,
              year,
            })
          }
        >
          {loading ? "Loading ..." : "Insert"}
        </button>
      </div>
      <h1 className="head_center">Degrees</h1>
      {<Degree degrees={storedDegrees} />}
    </div>
  );
}
