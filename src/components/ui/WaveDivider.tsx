export default function WaveDivider({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom', className?: string }) {
  if (position === 'top') {
    return (
      <div className={`w-full overflow-hidden leading-[0] ${className}`}>
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C7.2,2.44,14.54,4.72,21.9,6.86,116.5,33.51,215.35,50.13,321.39,56.44Z" className="fill-current"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-current"></path>
      </svg>
    </div>
  );
}
