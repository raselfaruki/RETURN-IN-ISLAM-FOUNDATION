import Stripe from 'stripe'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: 'Stripe secret key not configured on server' })

  const { items } = req.body
  if (!items || !items.length) return res.status(400).json({ error: 'No items' })

  try {
    // map items to line items. Here we assume price in cents/paisa in product.price.
    const line_items = items.map(it => ({
      price_data: {
        currency: 'bdt',
        product_data: { name: it.title },
        unit_amount: it.price
      },
      quantity: it.qty
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`
    })

    return res.status(200).json({ sessionUrl: session.url })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}