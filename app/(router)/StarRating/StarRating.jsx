"use client"; // This directive marks the component as a client component

import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ totalStars = 5, rating }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (index) => {
    setCurrentRating(index + 1);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((star, index) => (
        <Star 
          key={index} 
          index={index} 
          rating={currentRating} 
          handleClick={handleClick} 
        />
      ))}
    </div>
  );
};

const Star = ({ index, rating, handleClick }) => {
  return (
    <span
      className={`star ${rating > index ? 'filled' : ''}`}
      onClick={() => handleClick(index)}
    >
      &#9733;
    </span>
  );
};

export default StarRating;
