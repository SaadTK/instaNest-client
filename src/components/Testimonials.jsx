import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // You can replace this with an API call later
    const mockReviews = [
      {
        username: "Alice",
        rating: 5,
        comment: "Amazing stay! Highly recommend.",
        timestamp: "2025-05-01T10:00:00Z",
      },
      {
        username: "Bob",
        rating: 4,
        comment: "Very comfortable and clean room.",
        timestamp: "2025-05-03T15:30:00Z",
      },
    ];
    setReviews(mockReviews);
  }, []);

  if (!reviews?.length) {
    return <p className="text-gray-500 italic">No reviews available.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex justify-between">
            <h4 className="font-semibold">{review.username}</h4>
            <span className="text-yellow-500">⭐ {review.rating}</span>
          </div>
          <p className="mt-2">{review.comment}</p>
          <p className="text-xs text-gray-400">{new Date(review.timestamp).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
