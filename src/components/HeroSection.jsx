import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react'
import heroImage from '../assets/hero_bg.png'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950"
      id="hero"
    >
      {/* Background - Standard scroll flow */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Extreme Layered Overlay */}
      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-transparent to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="space-y-8"
        >
          {/* Headline - Unified Branding */}
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-4">
            <span className="block text-white">THE</span>
            <span className="gradient-text-accent block">ELEMENTS.</span>
          </h1>

          {/* Subheading - Refined SaaS Style */}
          <p className="text-xl sm:text-2xl max-w-2xl mx-auto font-medium text-slate-400 leading-relaxed tracking-tight">
            Exceptional design for the modern native. <br className="hidden sm:block" />
            Elegance in every form, power in every function.
          </p>

          {/* Buttons - Tactile & Magnetic */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link
                to="/shop"
                className="group relative px-12 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] bg-white text-slate-950 transition-all hover:bg-slate-200 shadow-2xl"
              >
                Shop Now
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
              >
                The Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements - Production Polish */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Expand</span>
          <motion.div
            animate={{ height: [24, 48, 24], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-px bg-white"
          />
        </div>
      </motion.div>
    </section>
  )
}
