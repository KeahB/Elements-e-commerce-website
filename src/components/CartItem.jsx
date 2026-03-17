import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex gap-8 py-10 border-b border-white/5 last:border-0"
    >
      {/* Image Container */}
      <Link
        to={`/product/${item.id}`}
        className="w-32 h-40 flex-shrink-0 bg-white rounded-[2rem] overflow-hidden p-6 hover:scale-[1.02] transition-transform duration-500"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </Link>

      {/* Info Container */}
      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <Link to={`/product/${item.id}`}>
              <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-white/80 transition-colors line-clamp-1">
                {item.title}
              </h3>
            </Link>
            <p className="text-lg font-black tracking-tighter text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            {item.category}
          </p>
        </div>

        <div className="flex justify-between items-end">
          {/* Quantity Controls - Minimal */}
          <div className="flex items-center gap-4 p-1 rounded-full border border-white/10 bg-white/5">
            <button
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-xs font-bold text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-red-400 transition-colors"
          >
            <Trash2 size={12} />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  )
}
