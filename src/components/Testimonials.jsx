import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/bookings", { withCredentials: true })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  const cancelBooking = async (id, checkIn) => {
    const now = new Date();
    const allowed = new Date(checkIn);
    allowed.setDate(allowed.getDate() - 1);

    if (now > allowed) return toast.error("Cancellation period passed");

    try {
      await axios.delete(`http://localhost:5005/api/bookings/${id}`, {
        withCredentials: true,
      });
      toast.success("Booking cancelled");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  const openReviewModal = (booking) => {
    setSelectedBooking(booking);
    setRating(5);
    setComment("");
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedBooking(null);
  };

  const submitReview = async () => {
    // Validate
    if (rating < 1 || rating > 5) {
      return toast.error("Rating must be between 1 and 5");
    }
    if (comment.trim().length === 0) {
      return toast.error("Comment cannot be empty");
    }

    const reviewData = {
      userName: user.displayName || user.email,
      rating,
      comment,
      roomId: selectedBooking.room._id,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5005/api/reviews", reviewData, {
        withCredentials: true,
      });
      toast.success("Review submitted!");
      closeReviewModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <>
      <Helmet>
        <title>My Bookings | InstaNest</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-primary">
          My Bookings
        </h1>

        {loading ? (
          <div className="text-center py-20 text-lg font-semibold text-gray-500">
            Loading your bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 text-xl text-gray-600">
            You have no bookings yet.{" "}
            <a href="/rooms" className="text-primary underline font-semibold">
              Browse rooms
            </a>{" "}
            to get started!
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="table w-full min-w-[600px]">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Room</th>
                  <th className="px-6 py-3 text-left">Check‑In</th>
                  <th className="px-6 py-3 text-center">Guests</th>
                  <th className="px-6 py-3 text-right">Total Price</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td>
                      <img
                        src={
                          b.room.images && b.room.images.length > 0
                            ? b.room.images[0]
                            : "/fallback-image.jpg"
                        }
                        alt={b.room.name}
                        className="w-20 h-14 rounded object-cover"
                      />
                      <div className="mt-1 font-semibold">{b.room.name}</div>
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {format(new Date(b.checkIn), "dd MMM yyyy")}
                    </td>
                    <td className="text-center px-6 py-4 text-gray-700 font-medium">
                      {b.guests}
                    </td>
                    <td className="text-right px-6 py-4 font-semibold text-primary">
                      ${b.totalPrice.toFixed(2)}
                    </td>
                    <td className="text-center px-6 py-4 space-x-2">
                      <button
                        onClick={() => cancelBooking(b._id, b.checkIn)}
                        className="btn btn-sm btn-error hover:btn-error/90 transition"
                      >
                        Cancel
                      </button>

                      {/* Show review button only if user is logged in */}
                      {user && (
                        <button
                          onClick={() => openReviewModal(b)}
                          className="btn btn-sm btn-primary hover:bg-primary/90 transition"
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Review Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-2xl font-semibold mb-4">
                Review for {selectedBooking.room.name}
              </h2>
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
                <button onClick={closeReviewModal} className="btn btn-outline">
                  Cancel
                </button>
                <button onClick={submitReview} className="btn btn-primary">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
