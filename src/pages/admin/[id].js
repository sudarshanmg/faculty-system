import { useRouter } from 'next/router';
import supabaseAdmin from '@/lib/supabaseAdmin';
import { useEffect, useState } from 'react';
import classes from '../../styles/Degree.module.css';
import { useSelector } from 'react-redux';

const User = () => {
  const [facultyDetails, setFacultyDetails] = useState({});
  const uid = useSelector((state) => state.uid.value);

  useEffect(() => {
    const getFacultyDetails = async (id) => {
      try {
        let { data, error, status } = await supabaseAdmin
          .from('profiles')
          .select(`*`)
          .eq('id', id);

        if (error && status !== 406) {
          throw error;
        }
        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    getFacultyDetails(uid);
  }, []);

  return <div>{'admin'}</div>;
};

export default User;


