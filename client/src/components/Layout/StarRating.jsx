import { useState } from "react";

const StarRating = ({ totalStars = 5, borderStar, goldStar, setNewReview }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
    setNewReview((prev) => ({ ...prev, rating: newRating }));
  };

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => (
        <img
          key={index}
          src={index < rating ? goldStar : borderStar}
          alt="star"
          className="w-8 h-8 cursor-pointer"
          onClick={() => handleRating(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
