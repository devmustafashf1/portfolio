// controllers/authController.js
import { supabase } from "../config/supabaseClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // store in .env

// ------------------- SIGNUP -------------------
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // Check if username or email already exists
    const { data: existingUser, error: existingError } = await supabase
      .from("admin")
      .select("*")
      .or(`username.eq.${username},email.eq.${email}`);

    if (existingError) {
      return res.status(500).json({ message: existingError.message });
    }

    if (existingUser && existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    const { data, error } = await supabase
      .from("admin")
      .insert([{ username, email, password: hashedPassword }])
      .select();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(201).json({ message: "Signup successful", user: data[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------- LOGIN -------------------
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const { data, error } = await supabase
      .from("admin")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: data.id, username: data.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: data.id, username: data.username, email: data.email },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
