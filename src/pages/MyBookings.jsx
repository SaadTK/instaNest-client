import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
// import ReviewModal from "./ReviewModal";
import ReviewModal from "../components/ReviewModal";
import PageHead from "../components/PageHead";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

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

  const openReviewModal = (room) => {
    setSelectedRoom(room);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <>
      <PageHead
        title="My Bookings"
        description="Book cozy rooms & enjoy your stay."
      />

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
                          onClick={() => openReviewModal(b.room)}
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
        {selectedRoom && (
          <ReviewModal
            roomId={selectedRoom._id}
            user={user}
            room={selectedRoom}
            isOpen={reviewModalOpen}
            onClose={closeReviewModal}
          />
        )}
      </div>
    </>
  );
};

export default MyBookings;
