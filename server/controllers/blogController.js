// controllers/blogController.js
import { supabase } from "../config/supabaseClient.js";

// {
//   "title": "New Blog Post",
//   "author": "GM",
//   "read_time": 6,
//   "pinned": true,
//   "excerpt": "Short description...",
//   "content": "Full blog content in markdown...",
//   "tags": "react, javascript, frontend"
// }


export const createBlog = async (req, res) => {
  try {
    const {
      title,
      author,
      read_time,
      pinned,
      excerpt,
      content,
      tags,
    } = req.body;

    // Validate required fields
    if (!title || !author || !excerpt || !content) {
      return res.status(400).json({
        error: "title, author, excerpt and content are required",
      });
    }

    // Convert comma separated tags → array
    const tagsArray = tags ? tags.split(",").map(t => t.trim()) : [];

    // Insert into Supabase
    const { data, error } = await supabase
      .from("blogs")
      .insert([
        {
          title,
          author,
          read_time,
          pinned: pinned ?? false,
          excerpt,
          content,
          tags: tagsArray,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Blog created successfully",
      blog: data[0],
    });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.json(data);
  } catch (err) {
    console.error("Error fetching blog:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getPinnedBlogs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("pinned", true)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Error fetching pinned blogs:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};