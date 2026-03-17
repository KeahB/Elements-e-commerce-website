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
        background: 'rgba(2, 6, 23, 0.95)',
        backdropFilter: 'blur(12px)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        fontSize: '12px',
        fontWeight: 'bold',
        letterSpacing: '0.05em',
      }
    })
  }

  const rating = product.rating?.rate ?? 4.2

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.04, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group relative flex flex-col rounded-[2.5rem] overflow-hidden bg-slate-900/40 border border-white/5 glass-premium magnetic-hover"
    >
      {/* Image Block */}
      <div className="relative aspect-[4/5] bg-white overflow-hidden p-10 flex items-center justify-center">
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </Link>
        
        {/* Subtle Inner Glow on Hover */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/5 to-transparent" />
      </div>

      {/* Info Block */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            {product.category}
          </p>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
            <Star size={10} className="text-yellow-500 fill-current" />
            <span className="text-[10px] font-bold text-white/40">{rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="text-lg font-bold tracking-tighter text-white leading-tight mb-2 group-hover:text-white/80 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Action Block */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <span className="text-xl font-black tracking-tighter text-white">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 rounded-2xl bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-slate-200 tap-scale border border-white/10"
            id={`add-to-cart-${product.id}`}
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}
