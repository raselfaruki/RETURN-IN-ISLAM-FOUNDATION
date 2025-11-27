import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import useTranslation from 'next-translate/useTranslation'
import ProductCarousel from '../../components/ProductCarousel'
import { useCart } from '../../lib/cart'

export default function ProductDetail() {
  const router = useRouter()
  const { slug } = router.query
  const { t, lang } = useTranslation('common')
  const [product, setProduct] = useState(null)
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!slug) return
    async function load() {
      const { data } = await supabase
        .from('product_translations')
        .select('*, products(price, currency, stock)')
        .eq('slug', slug)
        .eq('locale', lang || 'bn')
        .single()
      if (!data) return setProduct(null)
      setProduct({
        id: data.product_id,
        title: data.title,
        description: data.description,
        slug: data.slug,
        image_url: data.image_url,
        images: [data.image_url],
        price: data.products?.price || 0,
        currency: data.products?.currency || 'BDT',
        stock: data.products?.stock || 0
      })
    }
    load()
  }, [slug, lang])

  if (product === null) return <div>{t('shop.notFound')}</div>
  if (!product) return <div>Loading…</div>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ProductCarousel images={product.images} />
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <div className="text-indigo-600 font-semibold mb-4">৳ {(product.price/100).toFixed(2)}</div>
        <div className="mb-4 text-gray-700">{product.description}</div>
        <div className="flex items-center space-x-2 mb-4">
          <input type="number" min="1" max={product.stock} value={qty} onChange={e => setQty(Number(e.target.value))} className="w-20 border px-2 py-1" />
          <button onClick={() => addItem({ id: product.id, title: product.title, price: product.price, image_url: product.image_url }, qty)} className="bg-indigo-600 text-white px-4 py-2 rounded">
            {t('shop.addToCart')}
          </button>
        </div>
      </div>
    </div>
  )
}