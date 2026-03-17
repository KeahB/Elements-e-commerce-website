import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X, Package } from 'lucide-react'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-24">
      {!embedded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h1
            className="text-5xl sm:text-6xl font-black tracking-tighter mb-4"
            style={{ fontFamily: 'Inter, sans-serif', color: '#fff' }}
          >
            All <span className="text-white/40">Products.</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/20">
            {filtered.length} items available
          </p>
        </motion.div>
      )}

      {embedded && (
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-black tracking-tighter text-white"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Curated <span className="text-white/40">Selection.</span>
          </motion.h2>
        </div>
      )}

      {/* Search Input - Minimal Apple Style */}
      <div className="max-w-2xl mx-auto mb-16 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search our collection"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium text-white placeholder:text-white/10 outline-none transition-all duration-300 focus:border-white focus:placeholder:text-white/20"
            id="search-input"
          />
          <Search
            size={20}
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20"
            style={{ color: '#fff' }}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full lg:w-48 flex-shrink-0">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={v => { setSelectedCategory(v); setSidebarOpen(false) }}
            priceRange={maxPrice}
            onPriceChange={setMaxPrice}
            onReset={handleReset}
          />
        </div>

        {/* Grid */}
        <div className="flex-1">
          {error && (
            <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Connection Error</p>
              <p className="text-sm mt-2 text-white/20">{error}</p>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-40 border border-dashed border-white/10 rounded-[3rem]">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/20">No matching items</p>
              <button
                onClick={handleReset}
                className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-white/60 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
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
      transition={{ duration: 0.3 }}
      className="pt-16"
    >
      {content}
    </motion.div>
  )
}
