import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Sun, Moon, Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/cart', label: 'Cart' },
]

export default function Navbar() {
  const { cartCount, theme, toggleTheme } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div
          className={`relative flex items-center justify-between px-8 h-14 rounded-full transition-all duration-700 ${
            scrolled 
              ? 'glass-premium border-white/10 shadow-2xl opacity-100' 
              : 'bg-transparent border-transparent shadow-none'
          }`}
        >
          {/* Logo */}
            <Link
              to="/"
              className="group relative z-10 tap-scale"
            >
              <span className="text-xl font-black tracking-tighter text-white">
                ELEMENTS<span className="text-white/20">.</span>
              </span>
            </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className="relative text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:text-white group py-2"
                  style={{ color: active ? '#fff' : 'rgba(255,255,255,0.4)' }}
                >
                  {label}
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-white/40"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white/30 hover:text-white transition-all tap-scale"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <Link
              to="/cart"
              className="relative group p-2 text-white/30 hover:text-white transition-all tap-scale"
              id="cart-nav-link"
            >
              <ShoppingCart size={15} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="count"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1 right-1 text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center bg-white text-black leading-none"
                  >
                    {cartCount > 9 ? '+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              className="md:hidden p-2 text-white/30 hover:text-white transition-all tap-scale"
              onClick={() => setMobileOpen(v => !v)}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={16} />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Luxury Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 px-6 md:hidden"
          >
            <div className="glass-premium rounded-[2.5rem] p-8 border-white/5 space-y-4">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block text-2xl font-black tracking-tighter transition-all"
                  style={{ color: location.pathname === to ? '#fff' : 'rgba(255,255,255,0.2)' }}
                >
                  {label}.
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
