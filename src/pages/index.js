import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Homepage from '@/components/Homepage';
import React from 'react';

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Faculty Information System</h1>
      {!session ? (
        <>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
          <Link href={'/admin'}>Admin?</Link>
        </>
      ) : (
        <Homepage session={session} />
      )}
    </div>
  );
};

export default Home;
