import React, { useEffect, useState } from "react";
import axios from "axios";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/reviews") // Make sure this endpoint returns all reviews
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load reviews");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-8">Loading reviews...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (reviews.length === 0)
    return <p className="text-center py-8">No reviews available.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      {/* {reviews.map(({ _id, userName, rating, comment, timestamp }) => (
        <div key={_id} className="border rounded-lg p-4 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{userName}</p>
            <p className="text-yellow-500 font-bold">⭐ {rating}/5</p>
          </div>
          <p className="mb-2">{comment}</p>
          <p className="text-sm text-gray-500">
            {new Date(timestamp).toLocaleDateString()}
          </p>
        </div>
      ))} */}

      {reviews.map(({ _id, user, room, rating, comment, createdAt }) => (
        <div key={_id} className="border rounded-lg p-4 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{user?.name || "Anonymous"}</p>
            <p className="text-yellow-500 font-bold">⭐ {rating}/5</p>
          </div>
          <p className="mb-2">{comment}</p>
          <p className="text-sm italic mb-1">Room: {room?.name || "Unknown"}</p>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
