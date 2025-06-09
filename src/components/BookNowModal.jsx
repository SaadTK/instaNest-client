import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";

const BookNowModal = ({ room, onClose, onBookingSuccess }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Calculate totalPrice based on nights and room.price
  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * room.price;
  };

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      return Swal.fire(
        "Select dates",
        "Please select check-in and check-out dates.",
        "warning"
      );
    }
    if (checkOut <= checkIn) {
      return Swal.fire(
        "Invalid dates",
        "Check-out must be after check-in.",
        "warning"
      );
    }

    try {
      setBookingLoading(true);

      const totalPrice = calculateTotalPrice();

      const res = await axios.post(
        `http://localhost:5005/api/bookings`,
        {
          room: room._id,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          guests,
          totalPrice,
        },
        { withCredentials: true }
      );

      Swal.fire("Success!", "Room booked successfully.", "success");
      onBookingSuccess();
      onClose();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.error || "Booking failed",
        "error"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Book This Room</h2>
        <p>
          <strong>Name:</strong> {room.name}
        </p>
        <p>
          <strong>Price:</strong> ${room.price} / night
        </p>
        <div className="mb-4">
          <label className="font-semibold">Check-In Date</label>
          <DatePicker
            selected={checkIn}
            onChange={setCheckIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            className="input input-bordered w-full"
            placeholderText="Select check-in date"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Check-Out Date</label>
          <DatePicker
            selected={checkOut}
            onChange={setCheckOut}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            className="input input-bordered w-full"
            placeholderText="Select check-out date"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Guests</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <strong>Total Price: </strong> ${calculateTotalPrice()}
        </div>
        <div className="flex justify-end space-x-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleBooking}
            disabled={bookingLoading}
          >
            {bookingLoading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookNowModal;
