import supabaseAdmin from '@/lib/supabaseAdmin';

export default async function handler(req, res) {
  const password = req.body.password;
  console.log('pass', password);

  try {
    const { data, error } = await supabaseAdmin.from('admin').select('passw');
    if (data) {
      if (data[0].passw === password) {
        res.json({ auth: 'success' });
      } else {
        res.redirect('/');
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.send('admin');
  }

  //   const hashedPassword = rows[0].password;

  // Your code goes here
}
