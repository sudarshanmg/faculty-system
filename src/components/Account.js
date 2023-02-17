import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Avatar from './Avatar';
import classes from '../styles/Account.module.css';
import Layout from './Layout';

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [experience, setExperience] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState(null);
  const [religion, setReligion] = useState(null);
  const [community, setCommunity] = useState(null);
  const [joining_date, setJoiningDate] = useState(null);
  const [department, setDepartment] = useState(null);
  const [residence, setResidence] = useState(null);
  const [pan, setPan] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(
          `username, avatar_url, mobile, aadhaar, experience, dob, sex, religion, community, joining_date, department, residence, pan`
        )
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setMobile(data.mobile);
        setAadhaar(data.aadhaar);
        setExperience(data.experience);
        setDob(data.dob);
        setSex(data.sex);
        setReligion(data.religion);
        setCommunity(data.community);
        setJoiningDate(data.joining_date);
        setDepartment(data.department);
        setResidence(data.residence);
        setPan(data.pan);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    avatar_url,
    mobile,
    aadhaar,
    experience,
    dob,
    sex,
    religion,
    community,
    joining_date,
    department,
    residence,
    pan,
  }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        avatar_url,
        mobile,
        aadhaar,
        experience,
        dob,
        sex,
        religion,
        community,
        joining_date,
        department,
        residence,
        pan,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, avatar_url: url, mobile, experience });
        }}
      />

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          type="number"
          value={mobile || ''}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="aad">Aadhaar Number</label>
        <input
          id="aad"
          type="number"
          value={aadhaar || ''}
          onChange={(e) => setAadhaar(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="exp">Teaching Experience</label>
        <input
          id="exp"
          type="number"
          value={experience || ''}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          value={dob || ''}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sex">Sex</label>
        <input
          id="sex"
          type="text"
          value={sex || ''}
          onChange={(e) => setSex(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="religion">Religion</label>
        <input
          id="religion"
          type="text"
          value={religion || ''}
          onChange={(e) => setReligion(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="community">Community</label>
        <input
          id="community"
          type="text"
          value={community || ''}
          onChange={(e) => setCommunity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="joining_date">Joining Date</label>
        <input
          id="joining_date"
          type="date"
          value={joining_date || ''}
          onChange={(e) => setJoiningDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dept">Department</label>
        <input
          id="dept"
          type="text"
          value={department || ''}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="res_addr">Residential Address</label>
        <input
          id="res_addr"
          type="text"
          value={residence || ''}
          onChange={(e) => setResidence(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pan">PAN</label>
        <input
          id="pan"
          type="text"
          value={pan || ''}
          onChange={(e) => setPan(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({
              username,
              avatar_url,
              mobile,
              aadhaar,
              experience,
              dob,
              sex,
              religion,
              community,
              joining_date,
              department,
              residence,
              pan,
            })
          }
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
