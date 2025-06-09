import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((res) => setBookings(res.data))
      .catch(console.error);
  }, []);

  const cancelBooking = async (id, checkIn) => {
    const now = new Date();
    const allowed = new Date(checkIn);
    allowed.setDate(allowed.getDate() - 1);

    if (now > allowed) return toast.error("Cancellation period passed");

    await axios.delete(`/api/bookings/${id}`);
    toast.success("Booking cancelled");
    setBookings(bookings.filter((b) => b._id !== id));
  };

  return (
    <>
      <Helmet>
        <title>My Bookings | InstaNest</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">My Bookings</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Room</th>
                <th>Check‑In</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.room.name}</td>
                  <td>{format(new Date(b.checkIn), "dd MMM yyyy")}</td>
                  <td>{b.guests}</td>
                  <td>${b.totalPrice}</td>
                  <td>
                    <button
                      onClick={() => cancelBooking(b._id, b.checkIn)}
                      className="btn btn-sm btn-error mr-2"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyBookings;
