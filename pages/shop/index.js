import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import useTranslation from 'next-translate/useTranslation'
import ProductCard from '../../components/ProductCard'

export default function Shop() {
  const { t, lang } = useTranslation('common')
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const perPage = 12

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from('categories').select('*')
      setCategories(data || [])
    }
    loadCategories()
  }, [])

  useEffect(() => {
    async function load() {
      // join products and product_translations for current locale
      const { data } = await supabase
        .from('product_translations')
        .select('*, products(price, currency, stock)')
        .eq('locale', lang || 'bn')
        .ilike('title', `%${q}%`)
        .order('id', { ascending: false })
      let items = data || []
      if (category) items = items.filter(i => i.category_id == category)
      // map to usable product object
      const mapped = items.map(i => ({
        id: i.product_id,
        title: i.title,
        description: i.description,
        slug: i.slug,
        image_url: i.image_url,
        price: i.products?.price || 0,
        currency: i.products?.currency || 'BDT',
        stock: i.products?.stock || 0
      }))
      setProducts(mapped)
      setPage(1)
    }
    load()
  }, [q, category, lang])

  const paged = useMemo(() => products.slice((page-1)*perPage, page*perPage), [products, page])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('nav.shop')}</h1>
        <div className="flex items-center space-x-2">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('shop.searchPlaceholder')} className="border px-3 py-2" />
        </div>
      </div>

      <div className="mb-4">
        <select value={category} onChange={e => setCategory(e.target.value)} className="border px-3 py-2">
          <option value="">{t('shop.allCategories')}</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {paged.map(p => <ProductCard key={p.id} p={p} />)}
      </div>

      <div className="flex items-center justify-center mt-6 space-x-2">
        <button disabled={page===1} onClick={() => setPage(p => p-1)} className="px-3 py-1 border">{t('shop.prev')}</button>
        <div>{page} / {Math.max(1, Math.ceil(products.length / perPage))}</div>
        <button disabled={page*perPage >= products.length} onClick={() => setPage(p => p+1)} className="px-3 py-1 border">{t('shop.next')}</button>
      </div>
    </div>
  )
}