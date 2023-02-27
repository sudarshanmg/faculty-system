import supabaseAdmin from '@/lib/supabaseAdmin';

export default async function handler(req, res) {
  const password = req.body.password;
  console.log(password);
  res.json({auth: 'ok'});

  //   const hashedPassword = rows[0].password;

  // Your code goes here
}
