import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group flex gap-10 py-12 border-b border-white/5 last:border-0"
    >
      {/* Image Block */}
      <Link
        to={`/product/${item.id}`}
        className="w-36 h-48 flex-shrink-0 bg-white rounded-[2.5rem] overflow-hidden p-8 hover:scale-[1.02] transition-transform duration-500 relative"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
      </Link>

      {/* Info Block */}
      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-8">
            <Link to={`/product/${item.id}`} className="flex-1">
              <h3 className="text-xl font-black tracking-tighter text-white group-hover:text-white/80 transition-colors line-clamp-1">
                {item.title}
              </h3>
            </Link>
            <p className="text-xl font-black tracking-tighter text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            {item.category}
          </p>
        </div>

        <div className="flex justify-between items-center mt-8">
          {/* Controls */}
          <div className="flex items-center gap-6 p-1 rounded-full border border-white/5 bg-white/5">
            <button
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all tap-scale"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-black text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all tap-scale"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="group/remove flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/10 hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} className="group-hover/remove:scale-110 transition-transform" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
