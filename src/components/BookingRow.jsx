import { format } from "date-fns";

const BookingRow = ({ booking, onCancel, onUpdate, onReview }) => {
  return (
    <tr className="text-sm border-b">
      <td>
        <img
          src={booking.image}
          alt="room"
          className="w-16 h-10 object-cover rounded"
        />
      </td>
      <td>{booking.name}</td>
      <td>${booking.price}</td>
      <td>{format(new Date(booking.date), "PP")}</td>
      <td className="space-x-1">
        <button
          onClick={() => onCancel(booking)}
          className="text-red-600 hover:underline"
        >
          Cancel
        </button>
        <button
          onClick={() => onUpdate(booking)}
          className="text-blue-600 hover:underline"
        >
          Update Date
        </button>
        <button
          onClick={() => onReview(booking)}
          className="text-green-600 hover:underline"
        >
          Review
        </button>
      </td>
    </tr>
  );
};

export default BookingRow;
