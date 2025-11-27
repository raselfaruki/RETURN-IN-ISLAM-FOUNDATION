import useTranslation from 'next-translate/useTranslation'
import { useCart } from '../lib/cart'
import Link from 'next/link'

export default function CartPage() {
  const { t } = useTranslation('common')
  const { cart, updateQty, removeItem, total } = useCart()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('nav.cart')}</h1>
      {cart.items.length === 0 ? (
        <div>{t('cart.empty')}</div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.items.map(i => (
              <div key={i.productId} className="flex items-center justify-between border p-3">
                <div className="flex items-center space-x-3">
                  <img src={i.image} alt="" className="w-20 h-20 object-cover" />
                  <div>
                    <div className="font-semibold">{i.title}</div>
                    <div>৳ {(i.price/100).toFixed(2)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="number" value={i.qty} min="1" onChange={e => updateQty(i.productId, Number(e.target.value))} className="w-20 border px-2 py-1" />
                  <button onClick={() => removeItem(i.productId)} className="text-red-600">{t('cart.remove')}</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <div className="text-xl font-semibold">Total: ৳ {(total()/100).toFixed(2)}</div>
            <Link href="/checkout">
              <a className="inline-block mt-3 bg-indigo-600 text-white px-4 py-2 rounded">{t('cart.checkout')}</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}