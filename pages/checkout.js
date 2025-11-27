import useTranslation from 'next-translate/useTranslation'
import { useCart } from '../lib/cart'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Checkout() {
  const { t } = useTranslation('common')
  const { cart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.items })
      })
      const data = await res.json()
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl
      } else {
        alert(data.error || 'Checkout failed')
      }
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('checkout.title')}</h1>
      <p className="mb-4">{t('checkout.note')}</p>
      <button onClick={handleCheckout} disabled={loading || cart.items.length===0} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {loading ? t('checkout.processing') : t('checkout.payWithStripe')}
      </button>
    </div>
  )
}