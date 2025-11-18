import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'

const API_URL = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${API_URL}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === (p.id || p._id) )
      if (existing) {
        return prev.map((it) => it.id === (p.id || p._id) ? { ...it, quantity: it.quantity + 1 } : it)
      }
      return [
        ...prev,
        { id: p.id || p._id || `${Date.now()}`, title: p.title, price: p.price, image: p.image, quantity: 1,
          onQtyChange: (id, qty) => setCart((c) => c.map((x) => x.id === id ? { ...x, quantity: qty } : x))
        }
      ]
    })
    setCartOpen(true)
  }

  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.quantity, 0), [cart])

  const onCheckout = async () => {
    setCheckingOut(true)
    try {
      const items = cart.map((it) => ({ product_id: it.id, quantity: it.quantity }))
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer_name: 'Guest Buyer',
          email: 'guest@example.com',
          address: '123 Sunny Lane',
          payment_method: 'card'
        })
      })
      const data = await res.json()
      if (res.ok) {
        setToast({ type: 'success', message: `Order ${data.order_id} confirmed. Status: ${data.status}` })
        setCart([])
      } else {
        setToast({ type: 'error', message: data.detail || 'Payment failed' })
      }
    } catch (e) {
      setToast({ type: 'error', message: 'Network error' })
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header onCartToggle={() => setCartOpen(true)} cartCount={cartCount} onSearch={setQuery} />
      <Hero />
      {loading ? (
        <div className="max-w-6xl mx-auto px-6 py-16 text-slate-600">Loading products...</div>
      ) : (
        <ProductGrid products={products} addToCart={addToCart} query={query} />
      )}

      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {["Pasture-raised", "Delivered fresh", "Happy hens"].map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow ring-1 ring-black/5">
              <div className="text-amber-600 font-semibold">{t}</div>
              <p className="text-slate-600 mt-2">We partner with trusted local farms to bring you the best quality eggs.</p>
            </div>
          ))}
        </div>
      </section>

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 rounded-xl shadow text-white ${toast.type==='success' ? 'bg-emerald-500' : 'bg-rose-500'}`} onAnimationEnd={() => setTimeout(() => setToast(null), 3000)}>
          {toast.message}
        </div>
      )}

      <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onCheckout={onCheckout} updating={checkingOut} />
    </div>
  )
}

export default App
