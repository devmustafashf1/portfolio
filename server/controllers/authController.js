// controllers/authController.js
import { supabase } from '../config/supabaseClient.js'


export const login = async (req, res) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from("admin")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !data) {
    return res.status(401).json({ message: "Invalid username" });
  }

  // Plain text match for now
  if (data.password !== password) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.json({ message: "Login successful" });
};



export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // Check if email already exists
    const { data: existingUser, error: existingError } = await supabase
      .from("admin")
      .select("*")
      .or(`username.eq.${username},email.eq.${email}`);

    if (existingUser && existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Insert user
    const { data, error } = await supabase
      .from("admin")
      .insert([{ username, email, password }]);

    if (error) {
      return res.status(500).json({ message: "Signup failed" });
    }

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
