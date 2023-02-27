import Link from 'next/link';
import Account from './Account';
import { useEffect } from 'react';
import supabaseAdmin from '@/lib/supabaseAdmin';
import { useUser } from '@supabase/auth-helpers-react';

const Homepage = ({ session }) => {
  const user = useUser();

  const updatePasswordHandler = async () => {
    const newPassword = prompt('Enter your new password');
    try {
      const { data, error } = await supabaseAdmin.auth.updateUser({
        password: newPassword,
      });
      if(!error) {
        alert("Password updated successfully!");
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>Homepage</div>
        <Link href={'/home/qualifications'}>Qualifications</Link>
        <button onClick={updatePasswordHandler}>Update Password</button>
      </div>
      <Account session={session} />
    </div>
  );
};

export default Homepage;
