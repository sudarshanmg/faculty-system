import { useRef, useState } from 'react';
import supabaseAdmin from '@/lib/supabaseAdmin';
import Adminpage from '@/components/Adminpage';
import { useRouter } from 'next/router';

const Admin = () => {
  const passwInputRef = useRef();
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState([]);
  const authenticateAdmin = async () => {
    let { data, error } = await supabaseAdmin.from('elevate').select('*');
    if(data[0].pass === passwInputRef.current.value) {
      setAuth(true);
    } else {
      router.replace('/');
    }
  };
  return (
    <div className="container" style={{ margin: '1rem auto' }}>
      <h1>Welcome Admin</h1>
      {!auth && (
        <>
          <label htmlFor="password">Enter password</label>
          <input
            type="text"
            name="password"
            id="password"
            ref={passwInputRef}
          />
          <button onClick={() => authenticateAdmin()}>Submit</button>
        </>
      )}
      <div style={{ margin: '1rem auto' }}>{auth && <Adminpage />}</div>
    </div>
  );
};

export default Admin;
