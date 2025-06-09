// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Testimonials = ({ roomId }) => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     if (!roomId) return;

//     axios
//       .get(`/api/reviews/latest?roomId=${roomId}`, { withCredentials: true })
//       .then((res) => {
//         console.log("Reviews data:", res.data);
//         setReviews(res.data);
//       })
//       .catch((err) => console.error(err));
//   }, [roomId]);

//   if (!roomId) return <p>No room selected.</p>;

//   return (
//     <section className="my-10 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center">
//         What Our Guests Say
//       </h2>
//       <div className="carousel w-full space-x-6 overflow-x-auto flex pb-4">
//         {Array.isArray(reviews) && reviews.length > 0 ? (
//           reviews.map((review) => (
//             <div
//               key={review._id}
//               className="carousel-item w-80 bg-base-200 rounded-xl p-4"
//             >
//               <h3 className="font-semibold text-lg">{review.user?.name}</h3>
//               <p className="text-sm">{review.comment}</p>
//               <p className="text-yellow-500">Rating: {review.rating} / 5</p>
//               <p className="text-xs text-gray-400">
//                 {new Date(review.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center">No reviews yet.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
import React from "react";

const Testimonials = () => {
  return <div>Testimonials</div>;
};

export default Testimonials;
