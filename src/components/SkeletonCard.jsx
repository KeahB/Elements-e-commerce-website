export default function SkeletonCard() {
  return (
    <div className="rounded-[2.5rem] overflow-hidden bg-slate-900/40 border border-white/5 glass-premium skeleton-container">
      {/* Visual Block Placeholder */}
      <div className="aspect-[4/5] bg-white/5 relative skeleton-shimmer" />

      {/* Info Block Placeholder */}
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="h-2 w-16 bg-white/5 rounded-full skeleton-shimmer relative overflow-hidden" />
          <div className="h-4 w-10 bg-white/5 rounded-full skeleton-shimmer relative overflow-hidden" />
        </div>
        
        <div className="space-y-2">
          <div className="h-6 w-full bg-white/5 rounded-lg skeleton-shimmer relative overflow-hidden" />
          <div className="h-6 w-2/3 bg-white/5 rounded-lg skeleton-shimmer relative overflow-hidden" />
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="h-8 w-20 bg-white/5 rounded-lg skeleton-shimmer relative overflow-hidden" />
          <div className="h-12 w-24 bg-white/5 rounded-2xl skeleton-shimmer relative overflow-hidden" />
        </div>
      </div>
    </div>
  )
}
