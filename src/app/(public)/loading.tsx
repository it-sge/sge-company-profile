export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="flex flex-col md:grid md:grid-cols-[40%_60%] min-h-[60vh] w-full">
        <div className="w-full h-80 md:h-full bg-gray-100 animate-pulse" />
        <div className="w-full h-full bg-navy flex flex-col justify-center items-center px-6 py-24">
          <div className="w-3/4 h-10 bg-white/10 rounded-lg animate-pulse mb-4" />
          <div className="w-1/2 h-6 bg-white/10 rounded-lg animate-pulse mb-6" />
          <div className="w-full max-w-md h-24 bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
