import { useRef, useState } from 'react';
import Adminpage from '@/components/Adminpage';

const Admin = () => {
  const passwInputRef = useRef();
  const [auth, setAuth] = useState(false);
  const authenticateAdmin = async (e) => {
    e.preventDefault();
    const password = passwInputRef.current.value;
    try {
      const response = await fetch('api/adminAuth', {
        method: 'POST',
        body: JSON.stringify({
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if(response.ok) {
        console.log("data", data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container" style={{ margin: '1rem auto' }}>
      <h1>Welcome Admin</h1>
      {!auth && <form action="" method="post">
        <label htmlFor="password">Enter password</label>
        <input
          type="text"
          name="password"
          id="password"
          ref={passwInputRef}
        />
        <button onClick={authenticateAdmin}>Submit</button>
      </form>}
      <div style={{ margin: '1rem auto' }}>
        {auth && <Adminpage />}
      </div>
    </div>
  );
};

export default Admin;
