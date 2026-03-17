import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, Package, ShieldCheck } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import FilterSidebar from '../components/FilterSidebar'
import { useProducts } from '../hooks/useProducts'

const PRICE_MAX = 1000

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function Shop({ embedded = false }) {
  const { products, loading, error } = useProducts()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
      const matchesPrice = p.price <= maxPrice
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, search, selectedCategory, maxPrice])

  const handleReset = () => {
    setSearch('')
    setSelectedCategory('All')
    setMaxPrice(PRICE_MAX)
  }

  const content = (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl font-black tracking-tighter text-white"
          >
            {embedded ? 'Curated.' : 'Archive.'}
          </motion.h1>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
              {filtered.length} Items Indexed
            </span>
            <div className="w-8 h-px bg-white/10" />
          </div>
        </div>

        {/* Search - Ultra Minimal */}
        <div className="w-full md:w-96 relative group">
          <input
            type="text"
            placeholder="Search Archive"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white placeholder:text-white/10 outline-none transition-all duration-500 focus:border-white focus:placeholder:text-transparent"
          />
          <Search
            size={14}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-20 items-start">
        {/* Sidebar */}
        <div className="w-full lg:w-56 shrink-0 sticky top-32">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={maxPrice}
            onPriceChange={setMaxPrice}
            onReset={handleReset}
          />
          
          <div className="mt-12 pt-12 border-t border-white/5 space-y-6">
            <div className="flex items-center gap-3 opacity-20">
              <ShieldCheck size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Authentic</span>
            </div>
            <p className="text-[10px] font-bold text-white/10 leading-relaxed uppercase tracking-widest">
              Every item in our collection is meticulously inspected and verified for quality.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {error && (
            <div className="py-40 text-center glass-premium rounded-[3rem] border-white/5">
              <Package size={40} className="mx-auto text-white/10 mb-6" />
              <h3 className="text-xl font-bold tracking-tight text-white mb-2">Sync Error</h3>
              <p className="text-sm text-white/20 max-w-xs mx-auto">Unable to retrieve the archive. Please check your connection.</p>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="py-40 text-center border border-dashed border-white/10 rounded-[3rem]">
              <Package size={40} className="mx-auto text-white/5 mb-6" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Empty Result</p>
              <button
                onClick={handleReset}
                className="mt-8 px-8 py-4 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-all tap-scale"
              >
                Reset Archive
              </button>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (embedded) return content

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen pt-20"
    >
      {content}
    </motion.div>
  )
}
