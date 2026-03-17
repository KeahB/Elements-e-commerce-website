import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2, ShieldCheck } from 'lucide-react'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function Cart() {
  const { cart, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pt-48 pb-32 min-h-screen bg-slate-950"
      >
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <ShoppingBag size={64} className="mx-auto text-white/5" />
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white mb-8">
            Your bag <br />
            <span className="text-white/10 uppercase tracking-[0.2em] text-2xl block mt-4">is currently empty.</span>
          </h1>
          
          <p className="text-slate-500 mb-12 font-medium leading-relaxed">
            The archive awaits. Explore our collection and <br className="hidden sm:block" />
            curate your modern essentials.
          </p>
          
          <button
            onClick={() => navigate('/shop')}
            className="px-12 py-5 rounded-full bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-200 tap-scale shadow-2xl"
          >
            Explore Archive
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="pt-48 pb-32 min-h-screen bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white">
              Bag Review.
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                {cart.length} Elements in Collection
              </span>
              <div className="w-8 h-px bg-white/10" />
            </div>
          </div>
          
          <button
            onClick={clearCart}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10 hover:text-red-400 transition-colors py-2"
          >
            Dissolve Archive
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-32 items-start">
          {/* List Block */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="border-t border-white/5 divide-y divide-white/5">
              <AnimatePresence mode="popLayout" initial={false}>
                {cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Summary Block */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-40">
            <div className="rounded-[3rem] p-12 bg-slate-900/40 border border-white/5 glass-premium space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem] blur-2xl pointer-events-none" />
              
              <h2 className="text-2xl font-black tracking-tighter text-white">Collective.</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-white/20">Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-white/20">Sync Fee</span>
                  <span className="text-white">Included</span>
                </div>
                <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 pb-2">Total Value</span>
                  <span className="text-4xl font-black tracking-tighter text-white">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 rounded-full bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-slate-200 shadow-2xl"
                  id="checkout-button"
                >
                  Confirm Sync
                </motion.button>

                <div className="flex items-center justify-center gap-3 opacity-20">
                  <ShieldCheck size={14} className="text-white" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Encrypted Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
