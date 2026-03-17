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
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div
          className={`flex items-center justify-between px-6 py-2 rounded-full transition-all duration-500 glass-premium ${
            scrolled ? 'bg-slate-950/80 backdrop-blur-2xl border-white/10' : 'bg-transparent border-transparent shadow-none'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="text-lg font-bold tracking-tighter"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-white">LUXE</span>
              <span className="text-white/40 group-hover:text-white/60 transition-colors">SHOP.</span>
            </span>
          </Link>

          {/* Desktop Nav - Apple Style: Minimal, Centered-looking */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-white"
                  style={{
                    color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-white/40 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 p-1 text-white/40 hover:text-white transition-colors"
              id="cart-nav-link"
            >
              <ShoppingCart size={16} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="count"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center bg-white text-black"
                  >
                    {cartCount > 9 ? '!' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1 text-white/40 hover:text-white transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(15, 23, 42, 0.98)', borderTop: '1px solid rgba(124,58,237,0.15)' }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: location.pathname === to ? '#a78bfa' : '#94a3b8',
                    background: location.pathname === to ? 'rgba(124,58,237,0.1)' : 'transparent',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
