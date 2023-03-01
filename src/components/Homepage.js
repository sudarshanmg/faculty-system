import Link from 'next/link';
import Account from './Account';
import { useEffect, useState } from 'react';
import supabaseAdmin from '@/lib/supabaseAdmin';
import { useUser } from '@supabase/auth-helpers-react';
import Loader from './Loader';

const Homepage = ({ session }) => {
  const user = useUser();
  const [isLoading, setIsloading] = useState(false);

  const updatePasswordHandler = async () => {
    // const newPassword = prompt('Enter your new password');
    setIsloading(true);
    try {
      let { data, error } = await supabaseAdmin.auth.resetPasswordForEmail(
        user.email
      );

      setIsloading(false);

      if (!error) {
        alert('Check your email');
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
      setIsloading(false);
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
        <Link href={'/home/journals'}>Journals</Link>
        <Link href={'/home/conferences'}>Conferences</Link>
        <Link href={'/home/documents'}>Documents</Link>
        {!isLoading && (
          <button onClick={updatePasswordHandler}>{'Update Password'}</button>
        )}
        {isLoading && <Loader />}
      </div>

      <Account session={session} />
    </div>
  );
};

export default Homepage;
