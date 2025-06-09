const LoadingCard = () => {
  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden animate-pulse cursor-wait h-80">
      {/* Image Placeholder */}
      <div className="h-64 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div> {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-full"></div>{" "}
        {/* Description */}
        <div className="h-6 bg-gray-300 rounded w-1/2"></div> {/* Price */}
      </div>
    </div>
  );
};

export default LoadingCard;
