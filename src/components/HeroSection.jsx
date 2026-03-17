import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80&auto=format&fit=crop'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden text-white"
      id="hero"
    >
      {/* Background with higher quality treatment */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2s] hover:scale-105"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />

      {/* Multi-layer gradient overlay - more subtle and deep */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(2,6,23,0.4) 0%, rgba(2,6,23,0.9) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline - Apple Style: Large, Bold, Tight Tracking */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Discover Your <br />
          <span className="gradient-text">Style.</span>
        </motion.h1>

        {/* Subheading - More minimal */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl mb-12 max-w-2xl mx-auto font-medium"
          style={{ color: '#94a3b8', letterSpacing: '-0.02em', lineHeight: 1.4 }}
        >
          Premium products curated for the modern essentialist.
        </motion.p>

        {/* CTA Buttons - Premium Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            to="/shop"
            id="hero-shop-now"
            className="group relative px-10 py-5 rounded-full text-lg font-bold transition-all duration-500 hover:scale-105"
            style={{
              background: '#fff',
              color: '#020617',
            }}
          >
            Shop the Collection
          </Link>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-lg font-semibold transition-all duration-300 hover:gap-4"
            style={{ color: '#fff' }}
          >
            Explore our Story <ArrowRight size={20} className="transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: '#94a3b8' }}
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 rounded-full bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
