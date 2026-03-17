import { useState } from 'react'
import { ChevronDown, ChevronUp, RotateCcw, Filter } from 'lucide-react'

const CATEGORIES = [
  "All",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
]

const PRICE_MAX = 1000

function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold transition-colors"
        style={{ color: '#e2e8f0' }}
      >
        {title}
        {open ? <ChevronUp size={15} style={{ color: '#7c3aed' }} /> : <ChevronDown size={15} style={{ color: '#7c3aed' }} />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

export default function FilterSidebar({ selectedCategory, onCategoryChange, priceRange, onPriceChange, onReset }) {
  const [maxPrice, setMaxPrice] = useState(priceRange ?? PRICE_MAX)

  const handlePriceChange = (e) => {
    const val = Number(e.target.value)
    setMaxPrice(val)
    onPriceChange(val)
  }

  return (
    <aside
      className="h-fit sticky top-28"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Filter by</span>
        <button
          onClick={() => {
            setMaxPrice(PRICE_MAX)
            onReset()
          }}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mb-10">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white mb-4">Category</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="text-left text-sm py-1 transition-all duration-300 hover:translate-x-1"
                style={{
                  color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                  fontWeight: active ? '600' : '400',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white mb-4">Max Price</h3>
        <div className="px-1">
          <div className="flex justify-between text-[11px] font-medium mb-4 text-white/40">
            <span>$0</span>
            <span className="text-white">${maxPrice.toFixed(0)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            step={10}
            value={maxPrice}
            onChange={handlePriceChange}
            className="w-full accent-white"
            id="price-range-slider"
          />
        </div>
      </div>
    </aside>
  )
}
