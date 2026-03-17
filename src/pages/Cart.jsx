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
        className="pt-40 pb-24 min-h-screen text-center"
      >
        <div className="max-w-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-10 text-white/10"
          >
            <ShoppingBag size={80} className="mx-auto" />
          </motion.div>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Your bag <br />
            <span className="text-white/20">is empty.</span>
          </h1>
          <p className="text-slate-400 mb-10 font-medium">
            Discover our latest collection and find something special.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="px-10 py-5 rounded-full bg-white text-black text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-slate-200 active:scale-95"
          >
            Start Shopping
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
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="pt-40 pb-24 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="mb-16">
          <h1
            className="text-5xl sm:text-6xl font-black tracking-tighter text-white"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Review <span className="text-white/40">Bag.</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/20 mt-4">
            {cart.length} items in your collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          {/* List */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="border-t border-white/5">
              <AnimatePresence mode="popLayout">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>

            <button
              onClick={clearCart}
              className="mt-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-red-400 transition-colors"
            >
              Clear all items
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-32">
            <div className="rounded-[3rem] p-10 bg-white/5 border border-white/10 backdrop-blur-3xl space-y-8">
              <h2 className="text-xl font-bold tracking-tight text-white">Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-white/40">Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-white/40">Shipping</span>
                  <span className="text-white">Calculated at next step</span>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-black tracking-tighter text-white">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="w-full py-5 rounded-full bg-white text-black text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-slate-200 active:scale-95"
                id="checkout-button"
              >
                Checkout
              </button>

              <div className="flex items-center justify-center gap-2 opacity-20">
                <ShieldCheck size={14} className="text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
