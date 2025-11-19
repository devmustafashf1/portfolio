// controllers/workController.js
import { supabase } from "../config/supabaseClient.js";

// Expected request body:
// {
//   "title": "Project title",
//   "tags": "React, Node.js, MongoDB",
//   "description": "Brief description of the project",
//   "image_url": "https://example.com/image.jpg",
//   "project_url": "https://project-demo.com"
// }

export const createWork = async (req, res) => {
  try {
    const { title, tags, description, image_url, project_url } = req.body;

    // Ensure the request is authenticated and we have the user id from the token
    const userId = req.user && (req.user.userId || req.user.sub);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: user id missing from token' });
    }

    // Basic validation
    if (!title || !description) {
      return res.status(400).json({ error: "title and description are required" });
    }

    // Convert comma-separated tags -> array of trimmed strings
    const tagsArray = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    const { data, error } = await supabase
      .from('works')
      .insert([
        {
          user_id: userId,
          title,
          tags: tagsArray,
          description,
          image_url,
          project_url,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase Error (createWork):', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Work created successfully', work: data[0] });
  } catch (err) {
    console.error('Server Error (createWork):', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWorkById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('works')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Work not found' });
    }

    return res.json(data);
  } catch (err) {
    console.error('Error fetching work:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllWorks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('works')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Error fetching works:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
