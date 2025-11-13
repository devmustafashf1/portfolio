import { supabase } from '../config/supabaseClient.js'

export const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username,password);
    

  res.send('successful login')    
}
