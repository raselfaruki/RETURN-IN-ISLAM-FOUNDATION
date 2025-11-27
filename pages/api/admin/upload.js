import supabaseAdmin from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(500).json({ error: 'Service role not configured' })

  try {
    // Expect base64 file payload or multipart? We'll accept JSON with base64 and filename
    const { filename, fileBase64, bucket = 'products' } = req.body
    if (!filename || !fileBase64) return res.status(400).json({ error: 'Missing fields' })
    const buffer = Buffer.from(fileBase64, 'base64')
    const path = `${Date.now()}_${filename}`
    const { data, error } = await supabaseAdmin.storage.from(bucket).upload(path, buffer, { contentType: 'image/jpeg', upsert: false })
    if (error) return res.status(500).json({ error: error.message })
    const publicUrl = supabaseAdmin.storage.from(bucket).getPublicUrl(path).publicURL
    return res.status(200).json({ path, publicUrl })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}