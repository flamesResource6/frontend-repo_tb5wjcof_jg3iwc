import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-white to-amber-50" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Fresh eggs delivered to your door
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-4 text-lg text-slate-600"
            >
              Organic, free-range, quail and duck eggs from local farms. Crack into quality for your breakfasts and bakes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 flex gap-3"
            >
              <a href="#shop" className="px-5 py-3 rounded-xl bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition-colors">
                Shop eggs
              </a>
              <a href="#about" className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold bg-white/70 hover:bg-white transition-colors">
                Why us?
              </a>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="aspect-[4/3] rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 p-4"
            >
              <div className="h-full w-full rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.15),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.15),transparent_40%)] flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxFZ2dzfGVufDB8MHx8fDE3NjM0NDYxMDZ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Eggs" className="w-[85%] rounded-2xl shadow-lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
