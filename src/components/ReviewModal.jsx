import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const ReviewModal = ({ user, room, isOpen, onClose, roomId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  // const submitReview = async () => {
  //   if (rating < 1 || rating > 5) {
  //     return toast.error("Rating must be between 1 and 5");
  //   }
  //   if (comment.trim().length === 0) {
  //     return toast.error("Comment cannot be empty");
  //   }

  //   const reviewData = {
  //     userName: user.displayName || user.email,
  //     rating,
  //     comment,
  //     roomId: room._id,
  //     timestamp: new Date().toISOString(),
  //   };

  //   try {
  //     await axios.post("http://localhost:5005/api/reviews", reviewData, {
  //       withCredentials: true,
  //     });
  //     toast.success("Review submitted!");
  //     onClose();
  //     setRating(5);
  //     setComment("");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to submit review");
  //   }
  // };
  const submitReview = async () => {
    if (rating < 1 || rating > 5 || comment.trim() === "") {
      toast.error("Please enter a valid rating and comment");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5005/api/reviews/${roomId}`, // include roomId here
        { rating, comment },
        { withCredentials: true }
      );
      toast.success("Review submitted successfully");
      onClose(); // close modal after submission
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold mb-4">Review for {room.name}</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Your Name</label>
          <input
            type="text"
            value={user.displayName || user.email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Rating (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="btn btn-outline">
            Cancel
          </button>
          <button onClick={submitReview} className="btn btn-primary">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
