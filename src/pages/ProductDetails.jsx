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
    toast.success(`Archive Added`, {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 rounded-full border border-white/10"
        />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 gap-8">
        <Package size={48} className="text-white/5" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{error || 'Data Corrupted'}</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-10 py-4 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-all tap-scale"
        >
          Return to Archive
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
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="pt-32 pb-24 min-h-screen bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* Visual Block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="rounded-[3rem] overflow-hidden bg-white aspect-square flex items-center justify-center p-12 relative group"
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="max-w-[80%] max-h-[80%] object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
            <div className="absolute top-8 left-8">
              <Link to="/shop" className="flex items-center gap-3 text-black/20 hover:text-black/60 transition-colors group/back">
                <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Back</span>
              </Link>
            </div>
          </motion.div>

          {/* Info Block */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  {product.category}
                </span>
                <div className="h-px w-8 bg-white/10" />
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-yellow-500 fill-current" />
                  <span className="text-[10px] font-black text-white/40">{rating}</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[0.95] text-white">
                {product.title}.
              </h1>
              
              <p className="text-base font-medium leading-relaxed text-slate-400 tracking-tight max-w-lg">
                {product.description}
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black tracking-tighter text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">Excl. Taxes</span>
              </div>

              {/* Functional Row */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/5">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all tap-scale"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-black text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all tap-scale"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full bg-white text-slate-950 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-200 shadow-2xl"
                  >
                    Add to Archive
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
                {PERKS.map(({ icon: Icon, label }) => (
                  <div key={label} className="space-y-3">
                    <Icon size={14} className="text-white/20" />
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 leading-tight">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
