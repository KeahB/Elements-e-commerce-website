export default function SkeletonCard() {
  return (
    <div
      className="rounded-[2rem] overflow-hidden bg-[#0f172a]/40 border border-white/5 glass-premium"
    >
      {/* Image placeholder */}
      <div className="skeleton aspect-[4/5] bg-white opacity-5" />

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="skeleton h-3 w-12 rounded-full bg-white/5" />
          <div className="skeleton h-3 w-16 rounded-lg bg-white/5" />
        </div>
        
        {/* Title */}
        <div className="skeleton h-4 w-full rounded-lg bg-white/5" />

        {/* Button */}
        <div className="skeleton h-12 w-full rounded-2xl bg-white/5 mt-4" />
      </div>
    </div>
  )
}
