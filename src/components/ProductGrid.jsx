import React from 'react'
import { motion } from 'framer-motion'

export default function ProductGrid({ products, addToCart, query }) {
  const filtered = products.filter(p => p.title.toLowerCase().includes((query||'').toLowerCase()))
  return (
    <section id="shop" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Popular picks</h2>
          <p className="text-slate-600">Choose your favorite eggs</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, idx) => (
          <motion.div
            key={p.id || idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-2xl shadow ring-1 ring-black/5 overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2 mt-1">{p.description}</p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-lg font-bold text-slate-900">${p.price.toFixed(2)}</span>
                <button onClick={() => addToCart(p)} className="px-3 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600">Add to cart</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
