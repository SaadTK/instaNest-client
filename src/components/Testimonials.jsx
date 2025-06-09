import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/reviews") // Ensure this endpoint returns all reviews
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load reviews");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center py-8 text-lg font-semibold">
        ⏳ Loading reviews...
      </p>
    );
  if (error)
    return (
      <p className="text-center py-8 text-red-500 text-lg font-semibold">
        {error}
      </p>
    );
  if (reviews.length === 0)
    return (
      <p className="text-center py-8 text-lg font-semibold">
        No reviews available.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map(({ _id, user, room, rating, comment, createdAt }) => (
        <div
          key={_id}
          className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
        >
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-xl font-semibold text-primary">
              {user?.name || "Anonymous"}
            </h4>
          </div>

          {/* Star Ratings */}
          <div className="flex items-center gap-1 text-yellow-500 mb-3">
            {[...Array(rating || 0)].map((_, i) => (
              <FaStar key={i} className="text-lg" />
            ))}
          </div>

          {/* Review Comment */}
          <p className="text-gray-700 italic mb-4">
            {comment || "No comment provided."}
          </p>

          {/* Review Date & Room Info */}
          <p className="text-sm italic text-gray-500">
            Room: {room?.name || "Unknown"}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
