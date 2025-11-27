import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] })
  useEffect(() => {
    const raw = localStorage.getItem('cart_v1')
    if (raw) setCart(JSON.parse(raw))
  }, [])
  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(cart))
  }, [cart])

  const addItem = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.items.find(i => i.productId === product.id)
      if (found) {
        return { items: prev.items.map(i => i.productId === product.id ? { ...i, qty: i.qty + qty } : i) }
      }
      return { items: [...prev.items, { productId: product.id, title: product.title, price: product.price, image: product.image_url, qty }] }
    })
  }

  const updateQty = (productId, qty) => setCart(prev => ({ items: prev.items.map(i => i.productId === productId ? { ...i, qty } : i) }))
  const removeItem = (productId) => setCart(prev => ({ items: prev.items.filter(i => i.productId !== productId) }))
  const clear = () => setCart({ items: [] })
  const total = () => cart.items.reduce((s, i) => s + (i.price * i.qty), 0)

  return (
    <CartContext.Provider value={{ cart, addItem, updateQty, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)