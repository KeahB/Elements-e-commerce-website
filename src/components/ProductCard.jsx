import { motion } from 'framer-motion'
import { ShoppingCart, Star, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'

const CATEGORY_COLORS = {
  "men's clothing": { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
  "women's clothing": { bg: 'rgba(244,114,182,0.15)', color: '#f472b6', border: 'rgba(244,114,182,0.3)' },
  electronics: { bg: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: 'rgba(124,58,237,0.3)' },
  jewelery: { bg: 'rgba(234,179,8,0.15)', color: '#fbbf24', border: 'rgba(234,179,8,0.3)' },
}

function getCategoryStyle(category) {
  return CATEGORY_COLORS[category] || { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' }
}

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success(`Added to bag`, {
      style: {
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
      }
    })
  }

  const rating = product.rating?.rate ?? 4.2

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-[2rem] overflow-hidden bg-[#0f172a]/40 border border-white/5 card-scale glass-premium"
    >
      {/* Image Container */}
      <div
        className="relative aspect-[4/5] overflow-hidden bg-white flex items-center justify-center"
      >
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/5 text-black/50 backdrop-blur-md border border-black/5">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={12} fill="#fbbf24" style={{ color: '#fbbf24' }} />
            <span className="text-[11px] font-medium text-slate-400">{rating}</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-slate-200 line-clamp-1 group-hover:text-white transition-colors">
            {product.title}
          </h3>
        </Link>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full py-3 rounded-2xl text-[11px] font-bold uppercase tracking-[0.1em] bg-white text-black transition-all duration-300 hover:bg-slate-200 active:scale-95"
          id={`add-to-cart-${product.id}`}
        >
          Add to Bag
        </button>
      </div>
    </motion.div>
  )
}
