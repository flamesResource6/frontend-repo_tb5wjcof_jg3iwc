import React from 'react'
import { ShoppingCart, Egg, Search } from 'lucide-react'

export default function Header({ onCartToggle, cartCount, onSearch }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
            <Egg className="w-5 h-5 text-amber-600" />
          </div>
          <span className="font-extrabold text-slate-800 text-lg tracking-tight">SunnySide Eggs</span>
        </div>

        <div className="hidden md:flex items-center gap-2 max-w-md w-full mx-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search eggs, quail, duck..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/70 border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          onClick={onCartToggle}
          className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-rose-500 text-white w-5 h-5 rounded-full flex items-center justify-center shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
