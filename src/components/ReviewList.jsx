import React from "react";

const ReviewList = ({ reviews }) => {
  if (!reviews?.length) {
    return (
      <p className="text-gray-500 italic">No reviews yet for this room.</p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, idx) => (
        <div key={idx} className="p-4 bg-white rounded shadow-md">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{review.username}</h4>
            <span className="text-yellow-500">⭐ {review.rating}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-sm text-gray-400">
            {new Date(review.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
