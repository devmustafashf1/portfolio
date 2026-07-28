import crypto from 'crypto'
import { supabase } from '../config/supabaseClient.js'

const BUCKET = 'blog-images'

export const uploadImage = async (req, res) => {
  try {
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image files are allowed' })
    }

    const ext = (file.originalname.split('.').pop() || 'jpg').toLowerCase()
    const path = `blog/${crypto.randomUUID()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase Storage Error:', uploadError)
      const hint = /row-level security|not authorized|permission/i.test(uploadError.message)
        ? ' — check that SUPABASE_SERVICE_ROLE_KEY is set in server/.env'
        : ''
      return res.status(500).json({ error: uploadError.message + hint })
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)

    return res.status(201).json({ url: data.publicUrl })
  } catch (err) {
    console.error('Server Error (uploadImage):', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
