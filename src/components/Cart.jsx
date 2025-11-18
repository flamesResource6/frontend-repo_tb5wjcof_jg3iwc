import React from 'react'

export default function Cart({ open, items, onClose, onCheckout, updating }) {
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'} duration-300`}> 
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Your Cart</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
        </div>
        <div className="p-4 space-y-3 overflow-auto h-[calc(100%-180px)]">
          {items.length === 0 && (
            <p className="text-slate-600">Your cart is empty.</p>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-3 border rounded-lg p-2">
              <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium text-slate-900">{it.title}</div>
                <div className="text-sm text-slate-600">${it.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => it.onQtyChange(it.id, Math.max(1, it.quantity - 1))} className="px-2 py-1 rounded bg-slate-100">-</button>
                <span className="w-8 text-center">{it.quantity}</span>
                <button onClick={() => it.onQtyChange(it.id, it.quantity + 1)} className="px-2 py-1 rounded bg-slate-100">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600">Total</span>
            <span className="font-bold text-slate-900">${total.toFixed(2)}</span>
          </div>
          <button disabled={updating || items.length===0} onClick={onCheckout} className="w-full px-4 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 disabled:opacity-50">
            {updating ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </aside>
    </div>
  )
}
