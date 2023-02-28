import supabaseAdmin from "@/lib/supabaseAdmin";
import { useEffect, useState } from "react";
import classes from "../../styles/Degree.module.css";
import { useSelector } from "react-redux";
import Avatar from "@/components/Avatar";
import { useRouter } from "next/router";
import DegreeAdmin from "@/components/DegreeAdmin";
import JournalAdmin from "@/components/JournalAdmin";
import DocumentAdmin from "@/components/DocumentAdmin";

const User = () => {
  const [facultyDetails, setFacultyDetails] = useState({});
  const [facultyQualifications, setFacultyQualifications] = useState();
  const [facultyJournals, setFacultyJournals] = useState();
  const [facultyDocuments, setFacultyDocuments] = useState();
  const uid = useSelector((state) => state.uid.value);
  const router = useRouter();

  useEffect(() => {
    const getFacultyDetails = async (id) => {
      try {
        let { data: profile, error: profile_error } = await supabaseAdmin
          .from("profiles")
          .select(`*`)
          .eq("id", id);
        let { data: qualifications, error: qualifications_error } =
          await supabaseAdmin
            .from("qualifications")
            .select(`*`)
            .eq("user_id", id);
        let { data: journals, error: journals_error } = await supabaseAdmin
          .from("journals")
          .select(`*`)
          .eq("user_id", id);
        let { data: documents, error: docs_error } = await supabaseAdmin
          .from("documents")
          .select(`*`)
          .eq("user_id", id);

        if (profile_error) {
          console.log("sdhjb");
        }
        if (qualifications_error) {
          console.log(qualifications_error);
        }
        if (journals_error) {
          console.log(journals_error);
        }
        if (docs_error) {
          console.log(docs_error);
        }
        if (profile) {
          console.log(profile);
          setFacultyDetails(profile[0]);
        }
        if (qualifications) {
          console.log(qualifications);
          setFacultyQualifications(qualifications);
        }
        if (journals) {
          console.log(journals);
          setFacultyJournals(journals);
        }
        if (documents) {
          console.log(documents);
          setFacultyDocuments(documents);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getFacultyDetails(uid);
  }, []);

  const deleteFacultyHandler = async () => {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.deleteUser(uid);
      if (error) {
        alert(error);
      }
      if (data) {
        alert("Faculty deleted successfully!");
        router.replace("/admin/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`container ${classes.degree__container}`}
        key={facultyDetails.id}
      >
        <h1 className="head_center">
          {facultyDetails.username + "'s Profile"}
        </h1>
        <div style={{ margin: "1rem" }}>
          <div
            style={{
              margin: "1rem auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              uid={uid}
              url={facultyDetails.avatar_url}
              hideUpload={true}
              size={150}
            />
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Name</h2>
            <h2 className={classes.degree__name}>{facultyDetails.username}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>DOB</h2>
            <h2 className={classes.degree__name}>{facultyDetails.dob}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Sex</h2>
            <h2 className={classes.degree__name}>{facultyDetails.sex}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Mobile</h2>
            <h2 className={classes.degree__name}>{facultyDetails.mobile}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Religion</h2>
            <h2 className={classes.degree__name}>{facultyDetails.religion}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Community</h2>
            <h2 className={classes.degree__name}>{facultyDetails.community}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Address</h2>
            <h2 className={classes.degree__name}>{facultyDetails.residence}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Aadhaar</h2>
            <h2 className={classes.degree__name}>{facultyDetails.aadhaar}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Pan</h2>
            <h2 className={classes.degree__name}>{facultyDetails.pan}</h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Department</h2>
            <h2 className={classes.degree__name}>
              {facultyDetails.department}
            </h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Experience</h2>
            <h2 className={classes.degree__name}>
              {facultyDetails.experience}
            </h2>
          </div>
          <div style={{ margin: "1rem auto" }}>
            <h2 className={classes.degree__title}>Joining Date</h2>
            <h2 className={classes.degree__name}>
              {facultyDetails.joining_date}
            </h2>
          </div>
          <button className="block danger" onClick={deleteFacultyHandler}>
            Delete Faculty
          </button>
        </div>
      </div>
      <div>
        {/* teat */}
        <h1 className="head_center">Qualifications</h1>
        {facultyQualifications?.map((degree) => (
          <DegreeAdmin key={degree.id} degree={degree} />
        ))}
      </div>
      <div>
        <h1 className="head_center">Journals</h1>
        {facultyJournals?.map((journal) => {
          return <JournalAdmin key={journal.id} journal={journal} />;
        })}
      </div>
      <div>
        <h1 className="head_center">Documents</h1>
        {facultyDocuments?.map((doc) => {
          return <DocumentAdmin doc={doc} />;
        })}
      </div>
    </>
  );
};

export default User;
