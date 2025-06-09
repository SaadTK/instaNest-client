// import React from "react";

// const ReviewList = ({ reviews }) => {
//   if (!reviews?.length) {
//     return (
//       <p className="text-gray-500 italic">No reviews yet for this room.</p>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {reviews.map((review, idx) => (
//         <div key={idx} className="p-4 bg-white rounded shadow-md">
//           <div className="flex justify-between items-center">
//             <h4 className="font-semibold">{review.username}</h4>
//             <span className="text-yellow-500">⭐ {review.rating}</span>
//           </div>
//           <p className="text-gray-700">{review.comment}</p>
//           <p className="text-sm text-gray-400">
//             {new Date(review.timestamp).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewList;
// components/ReviewList.jsx
import React from "react";
import { format } from "date-fns";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet for this room.</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold mb-2">Reviews</h3>
      {reviews
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((review, idx) => (
          <div key={idx} className="border rounded p-4 shadow-sm">
            <div className="flex justify-between mb-1">
              <p className="font-bold">{review.username}</p>
              <span className="text-yellow-500">⭐ {review.rating}/5</span>
            </div>
            <p className="text-gray-800">{review.comment}</p>
            <p className="text-sm text-gray-500 mt-1">
              {format(new Date(review.date), "MMMM d, yyyy")}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ReviewList;
