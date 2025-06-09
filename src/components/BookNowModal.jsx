import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const BookNowModal = ({ room, onClose, onConfirm }) => {
  const [date, setDate] = useState(new Date());

  const handleBooking = () => {
    if (!date) return toast.error("Please select a date");
    onConfirm(date);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Your Booking</h2>
        <div className="space-y-2">
          <p>
            <strong>Room:</strong> {room.name}
          </p>
          <p>
            <strong>Price:</strong> ${room.price}
          </p>
          <p>
            <strong>Description:</strong> {room.description}
          </p>
          <div>
            <label className="block text-sm font-medium">
              Select Booking Date:
            </label>
            <DatePicker
              selected={date}
              onChange={setDate}
              className="mt-1 border px-2 py-1 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-1 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookNowModal;
