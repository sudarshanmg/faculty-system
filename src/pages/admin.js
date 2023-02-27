import { useRef, useState } from 'react';
import Adminpage from '@/components/adminpage';

const Admin = () => {
  const passwInputRef = useRef();
  const [auth, setAuth] = useState(false);
  const authenticateAdmin = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch('/api/adminAuth', {
        method: 'POST',
        body: JSON.stringify({
          password: passwInputRef.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await data.json();
      if (data.ok) {
        if (response.auth === 'success') {
          sessionStorage.setItem('signedIn', 'true');
          setAuth(true);
        }
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
