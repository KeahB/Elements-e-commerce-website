import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, ArrowLeft, Star, Shield, Truck, RefreshCw, Plus, Minus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const CATEGORY_BADGE = {
  "men's clothing": { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
  "women's clothing": { bg: 'rgba(244,114,182,0.15)', color: '#f472b6', border: 'rgba(244,114,182,0.3)' },
  electronics: { bg: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: 'rgba(124,58,237,0.3)' },
  jewelery: { bg: 'rgba(234,179,8,0.15)', color: '#fbbf24', border: 'rgba(234,179,8,0.3)' },
}

const PERKS = [
  { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
  { icon: Shield, label: 'Secure Payment', desc: '100% protected' },
  { icon: RefreshCw, label: 'Easy Returns', desc: '30-day return policy' },
]

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Product not found')
        return r.json()
      })
      .then(data => { setProduct(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`Added to bag`, {
      style: {
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 gap-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">{error || 'Item not found'}</p>
        <button
          onClick={() => navigate('/shop')}
          className="text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-white/60 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    )
  }

  const rating = product.rating?.rate ?? 4.2

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="pt-32 pb-24 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[3rem] overflow-hidden bg-white aspect-[4/5] flex items-center justify-center p-16"
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain transition-transform duration-1000 hover:scale-105"
            />
          </motion.div>

          {/* Info Panel */}
          <div className="flex flex-col gap-10">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                {product.category}
              </span>
              <h1
                className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.1] text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star size={14} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                  <span className="text-sm font-bold text-white">{rating}</span>
                </div>
                <span className="text-sm font-bold text-white/20">/</span>
                <span className="text-sm font-medium text-white/40">Ships Worldwide</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-white/20 uppercase tracking-widest italic">USD</span>
              </div>
              <p className="text-base font-medium leading-relaxed text-slate-400 max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="space-y-8">
              {/* Quantity */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Quantity</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white text-black py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-slate-200 active:scale-95"
                >
                  Add to Bag
                </button>
                <Link
                  to="/cart"
                  className="px-10 py-5 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/5 text-center"
                >
                  View Bag
                </Link>
              </div>
            </div>

            {/* Subtle Trust Indicators */}
            <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
              {PERKS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
                  <Icon size={16} className="text-white" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-white text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
