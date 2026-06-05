export default function SkeletonCard() {
  return (
    <div className="relative h-[100dvh] w-full snap-start snap-always bg-zinc-900 animate-pulse">
      {/* Bottom info skeleton */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 space-y-3">
        <div className="h-5 w-28 rounded-full bg-zinc-700" />
        <div className="h-8 w-44 rounded-lg bg-zinc-700" />
        <div className="h-5 w-56 rounded-lg bg-zinc-700" />
        <div className="h-4 w-36 rounded-lg bg-zinc-700" />
        <div className="flex gap-2">
          <div className="h-6 w-14 rounded-full bg-zinc-700" />
          <div className="h-6 w-16 rounded-full bg-zinc-700" />
          <div className="h-6 w-12 rounded-full bg-zinc-700" />
        </div>
      </div>
      {/* Right buttons skeleton */}
      <div className="absolute bottom-40 right-3 flex flex-col gap-5">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-12 w-12 rounded-full bg-zinc-700" />
        ))}
      </div>
    </div>
  );
}
