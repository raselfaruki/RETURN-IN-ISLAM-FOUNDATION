import supabaseAdmin from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' })
  }

  const { method } = req

  if (method === 'GET') {
    const { locale } = req.query
    let q = supabaseAdmin.from('product_translations').select('*, products(*)')
    if (locale) q = q.eq('locale', locale)
    const { data, error } = await q.order('id', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (method === 'POST') {
    const { product, translation } = req.body
    // product: { price, sku, stock, currency }
    // translation: { locale, title, description, slug, image_url, category_id }
    const { data: prod, error: prodErr } = await supabaseAdmin.from('products').insert([product]).select().single()
    if (prodErr) return res.status(500).json({ error: prodErr.message })
    const { data: trans, error: transErr } = await supabaseAdmin.from('product_translations').insert([{ ...translation, product_id: prod.id }]).select().single()
    if (transErr) return res.status(500).json({ error: transErr.message })
    return res.status(201).json({ product: prod, translation: trans })
  }

  if (method === 'PUT') {
    const { id, product, translation } = req.body
    if (product) {
      const { data, error } = await supabaseAdmin.from('products').update(product).eq('id', id)
      if (error) return res.status(500).json({ error: error.message })
    }
    if (translation) {
      const { data, error } = await supabaseAdmin.from('product_translations').update(translation).eq('product_id', id).eq('locale', translation.locale)
      if (error) return res.status(500).json({ error: error.message })
    }
    return res.status(200).json({ ok: true })
  }

  if (method === 'DELETE') {
    const { id } = req.query
    const { error } = await supabaseAdmin.from('products').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', ['GET','POST','PUT','DELETE'])
  res.status(405).end(`Method ${method} Not Allowed`)
}