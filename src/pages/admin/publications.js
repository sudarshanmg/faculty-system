import JournalAdmin from "@/components/JournalAdmin";
import supabaseAdmin from "@/lib/supabaseAdmin";
import { useState } from "react";
import ConferenceAdmin from "@/components/ConferenceAdmin";

const publications = () => {
  const [pubInput, setPubInput] = useState("journals");
  const [year, setYear] = useState();
  const [pubData, setPubData] = useState([]);
  const [data, setData] = useState([]);
  let username;

  const fetchPublicationsHandler = async () => {
    const pub = pubInput;
    console.log("year", year);

    const { data, error } =
      year !== undefined && year !== 0
        ? await supabaseAdmin.from(pub).select("*").eq("year", year)
        : await supabaseAdmin.from(pub).select("*");
    // if (data) {
    //   let a = data.map(async (d) => {
    //     console.log(d.user_id);
    //     const { data: name, error: name_error } = await supabaseAdmin
    //       .from("profiles")
    //       .select("username")
    //       .eq(`id`, d.user_id);
    //     if (name) {
    //       username = name[0].username;
    //     }
    //     if (name_error) {
    //       return name_error;
    //     }

    //     return {
    //       data: d,
    //       username,
    //     };
    //   });
    if (data) {
      setPubData(data);
    }
    if (data.length === 0) {
      alert("No data found!");
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Publications</h1>
        <label htmlFor="year">Select Year</label>
        <input
          type={"number"}
          name={"year"}
          id="year"
          onChange={(e) => setYear(+e.target.value)}
        />
        <label htmlFor="year">Select Type</label>
        <select
          onChange={(e) => {
            return setPubInput(e.target.value);
          }}
        >
          <option value={"journals"}>Journals</option>
          <option value={"conferences"}>Conferences</option>
        </select>
        <button onClick={fetchPublicationsHandler}>Submit</button>
      </div>
      {pubData &&
        pubData.map((data) => {
          console.log(data);
          return (
            <>
              {console.log("data", data)}
              <JournalAdmin key={data.id} showName={true} journal={data} />
            </>
          );
        })}
    </>
  );
};

export default publications;
