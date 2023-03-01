import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Loader from '@/components/Loader';

export default function ResetPassword() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const { token } = router.query;

  const [isLoading, setIsloading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      setIsloading(false);

      if (error) console.log(error);
      if (data) {
        alert('Password updated successfully!');
        router.replace('/');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {errorMsg && <p>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm new password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {!isLoading && <button type="submit">Reset Password</button>}
        {isLoading && <Loader />}
      </form>
    </div>
  );
}
