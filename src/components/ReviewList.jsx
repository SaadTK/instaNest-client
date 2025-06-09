import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

const ReviewList = ({ reviews }) => {
  const [users, setUsers] = useState({}); // { userId: {email, name} }

  useEffect(() => {
    // Get unique userIds from reviews
    const uniqueUserIds = [...new Set(reviews.map((r) => r.user?._id))];

    // Fetch user data for all unique userIds
    const fetchUsers = async () => {
      const usersData = {};
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          try {
            const res = await axios.get(`/api/users/${userId}`);
            usersData[userId] = res.data; // Assuming response includes email and name
          } catch (err) {
            usersData[userId] = null; // Handle errors as needed
          }
        })
      );
      setUsers(usersData);
    };

    if (uniqueUserIds.length > 0) fetchUsers();
  }, [reviews]);

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return format(date, "PPpp");
  };

  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6 text-lg font-semibold">
        No reviews yet. Be the first to leave one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {reviews.map((review) => {
        const user = users[review.userId];
        const userNameOrEmail = user?.name || user?.email || "Anonymous";

        return (
          <div
            key={review._id}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <h4 className="text-xl font-semibold text-primary mb-2">
              {userNameOrEmail}
            </h4>

            {/* Star Ratings */}
            <div className="flex items-center gap-1 text-yellow-500 mb-3">
              {[...Array(review.rating || 0)].map((_, i) => (
                <span key={i} className="text-lg">
                  ⭐
                </span>
              ))}
            </div>

            <p className="text-gray-700 italic mb-4">
              {review.comment || "No comment provided."}
            </p>

            <p className="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
