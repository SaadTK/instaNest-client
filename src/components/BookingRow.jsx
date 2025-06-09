import { format } from "date-fns";
import { FaTrash, FaEdit, FaStar } from "react-icons/fa";

const BookingRow = ({ booking, onCancel, onUpdate, onReview }) => {
  return (
    <tr className="text-sm border-b hover:bg-gray-100 transition">
      <td className="p-4">
        <img
          src={booking.image}
          alt="room"
          className="w-20 h-14 object-cover rounded-lg shadow-md"
        />
      </td>
      <td className="font-semibold text-gray-800">{booking.name}</td>
      <td className="text-lg font-bold text-primary">${booking.price}</td>
      <td className="text-gray-600">{format(new Date(booking.date), "PP")}</td>
      <td className="space-x-2 flex items-center">
        <button
          onClick={() => onCancel(booking)}
          className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
        >
          <FaTrash /> Cancel
        </button>
        <button
          onClick={() => onUpdate(booking)}
          className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
        >
          <FaEdit /> Update Date
        </button>
        <button
          onClick={() => onReview(booking)}
          className="text-green-600 hover:text-green-800 transition flex items-center gap-1"
        >
          <FaStar /> Review
        </button>
      </td>
    </tr>
  );
};

export default BookingRow;
