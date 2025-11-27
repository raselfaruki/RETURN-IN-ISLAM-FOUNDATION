import { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { supabase } from '../../lib/supabaseClient'

export default function AdminProducts() {
  const { t } = useTranslation('common')
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ price: 1000, sku: '', stock: 10, currency: 'BDT', locale: 'bn', title: '', description: '', slug: '', image_url: '', category_id: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/admin/products?locale=bn')
      const data = await res.json()
      setProducts(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setSaving(true)
    const product = { price: Number(form.price), sku: form.sku, stock: Number(form.stock), currency: form.currency }
    const translation = { locale: form.locale, title: form.title, description: form.description, slug: form.slug, image_url: form.image_url, category_id: form.category_id ? Number(form.category_id) : null }
    const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product, translation }) })
    const data = await res.json()
    if (!res.ok) alert(data.error || 'Error')
    else setProducts(prev => [data.translation, ...prev])
    setSaving(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('admin.products')}</h1>

      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <input placeholder="SKU" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="border px-3 py-2" />
        <input placeholder="Price (paisa)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border px-3 py-2" />
        <input placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="border px-3 py-2" />
        <input placeholder="Image URL" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} className="border px-3 py-2" />
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border px-3 py-2 col-span-2" />
        <input placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="border px-3 py-2" />
        <select value={form.locale} onChange={e => setForm({ ...form, locale: e.target.value })} className="border px-3 py-2">
          <option value="bn">বাংলা</option>
          <option value="en">English</option>
        </select>
        <button type="submit" disabled={saving} className="bg-indigo-600 text-white px-4 py-2 rounded">{saving ? t('admin.saving') : t('admin.create')}</button>
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="border px-3 py-2 col-span-2" />
      </form>

      <div>
        {loading ? <div>Loading…</div> :
          <div className="grid md:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="border p-3">
                <img src={p.image_url} alt="" className="h-40 w-full object-cover mb-2" />
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">{p.description}</div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}