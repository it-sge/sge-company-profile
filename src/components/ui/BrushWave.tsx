export default function BrushWave({ position = 'top', className = '' }: { position?: 'top' | 'bottom', className?: string }) {
  
  
  const TileableWaves = () => (
    <div className="absolute inset-0 flex w-[200%] animate-wave-slow">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full block">
        {/* Layer 1 (slowest/farthest) */}
        <path fill="currentColor" opacity="0.25" d="M0,80 C300,160 300,0 600,80 C900,160 900,0 1200,80 L1200,120 L0,120 Z" />
        {/* Layer 2 (middle) */}
        <path fill="currentColor" opacity="0.4" d="M0,60 C300,-20 300,140 600,60 C900,-20 900,140 1200,60 L1200,120 L0,120 Z" />
        {/* Layer 3 (front/fastest visual) */}
        <path fill="currentColor" opacity="1" d="M0,90 C300,120 300,60 600,90 C900,120 900,60 1200,90 L1200,120 L0,120 Z" />
      </svg>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full block">
        <path fill="currentColor" opacity="0.25" d="M0,80 C300,160 300,0 600,80 C900,160 900,0 1200,80 L1200,120 L0,120 Z" />
        <path fill="currentColor" opacity="0.4" d="M0,60 C300,-20 300,140 600,60 C900,-20 900,140 1200,60 L1200,120 L0,120 Z" />
        <path fill="currentColor" opacity="1" d="M0,90 C300,120 300,60 600,90 C900,120 900,60 1200,90 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );

  if (position === 'top') {
    // For top wave, we flip it vertically and pull it up slightly so it connects seamlessly
    return (
      <div className={`w-full overflow-hidden leading-[0] relative h-[60px] md:h-[120px] lg:h-[160px] ${className}`} style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}>
        <TileableWaves />
      </div>
    );
  }

  // Bottom wave
  return (
    <div className={`w-full overflow-hidden leading-[0] relative h-[60px] md:h-[120px] lg:h-[160px] ${className}`}>
       <TileableWaves />
    </div>
  );
}
