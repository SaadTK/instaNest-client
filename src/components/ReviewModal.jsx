import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ user, room, isOpen, onClose, roomId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(null);

  if (!isOpen) return null;

  const submitReview = async () => {
    if (rating < 1 || rating > 5 || comment.trim() === "") {
      toast.error("Please enter a valid rating and comment");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5005/api/reviews/${roomId}`,
        { rating, comment },
        { withCredentials: true }
      );
      toast.success("Review submitted successfully");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-md mx-4 transition-transform scale-95 hover:scale-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Review for {room.name}
        </h2>

        {/* User Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={user.displayName || user.email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        {/* Star Rating Selector */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-2xl cursor-pointer ${
                  (hover || rating) > i ? "text-yellow-500" : "text-gray-400"
                }`}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="btn btn-secondary px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={submitReview}
            className="btn btn-primary px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
