import Link from 'next/link';
import Account from './Account';
import { useState } from 'react';
import supabaseAdmin from '@/lib/supabaseAdmin';
import { useUser } from '@supabase/auth-helpers-react';
import Loader from './Loader';
import styles from '../styles/Options.module.css';

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
      <div className={styles.options__container}>
        <div className={styles.option}>Homepage</div>
        <div className={styles.option}>
          <Link href={'/home/qualifications'}>Qualifications</Link>
        </div>
        <div className={styles.option}>
          <Link href={'/home/journals'} className={styles.option}>
            Journals
          </Link>
        </div>
        <div className={styles.option}>
          <Link href={'/home/conferences'} className={styles.option}>
            Conferences
          </Link>
        </div>
        <div className={styles.option}>
          <Link href={'/home/documents'} className={styles.option}>
            Documents
          </Link>
        </div>
        {!isLoading && (
          <button onClick={updatePasswordHandler} className={styles.option}>
            {'Update Password'}
          </button>
        )}
        {isLoading && <Loader />}
      </div>

      <Account session={session} />
    </div>
  );
};

export default Homepage;
