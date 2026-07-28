import { supabase } from './supabaseClient.js'

const BUCKET = 'blog-images'

export async function ensureStorageBucket() {
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: '5MB',
  })

  if (error && !/already exists/i.test(error.message)) {
    console.warn(`Could not ensure "${BUCKET}" storage bucket:`, error.message)
    return
  }

  console.log(`Storage bucket "${BUCKET}" ready`)
}
