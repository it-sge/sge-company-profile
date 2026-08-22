export default function CurvyDivider({ 
  direction = 'down', 
  topColor = 'bg-white',
  bottomColor = 'text-navy',
  className = '' 
}: { 
  direction?: 'down' | 'up', 
  topColor?: string,
  bottomColor?: string,
  className?: string 
}) {
  
  if (direction === 'up') {
    // When moving from Navy (top) to White (bottom):
    // topColor should be 'bg-navy'
    // bottomColor should be 'text-white'
    return (
      <div className={`w-full overflow-hidden leading-[0] ${topColor} ${className}`}>
        {/* We use scaleY(-1) to flip the SVG so the filled part is at the top */}
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={`w-full h-[60px] md:h-[120px] lg:h-[180px] block ${bottomColor}`} style={{ transform: 'scaleY(-1)' }}>
          <path fill="currentColor" d="M0,128L80,149.3C160,171,320,213,480,202.7C640,192,800,128,960,112C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          <path fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" d="M0,96L80,117.3C160,139,320,181,480,170.7C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128"></path>
          <path fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.1" d="M0,64L80,85.3C160,107,320,149,480,138.7C640,128,800,64,960,48C1120,32,1280,64,1360,80L1440,96"></path>
        </svg>
      </div>
    );
  }

  // direction === 'down'
  // When moving from White (top) to Navy (bottom):
  // topColor should be 'bg-white'
  // bottomColor should be 'text-navy'
  return (
    <div className={`w-full overflow-hidden leading-[0] ${topColor} ${className}`}>
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={`w-full h-[60px] md:h-[120px] lg:h-[180px] block ${bottomColor}`}>
        <path fill="currentColor" d="M0,128L80,149.3C160,171,320,213,480,202.7C640,192,800,128,960,112C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        <path fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" d="M0,96L80,117.3C160,139,320,181,480,170.7C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128"></path>
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.1" d="M0,64L80,85.3C160,107,320,149,480,138.7C640,128,800,64,960,48C1120,32,1280,64,1360,80L1440,96"></path>
      </svg>
    </div>
  );
}
