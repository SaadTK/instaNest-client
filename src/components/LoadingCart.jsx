const LoadingCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse cursor-wait h-72">
      <div className="h-60 bg-gray-300"></div> {/* Image placeholder */}
      <div className="card-body">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>{" "}
        {/* Description */}
        <div className="h-6 bg-gray-300 rounded w-1/2"></div> {/* Price */}
      </div>
    </div>
  );
};

export default LoadingCard;
