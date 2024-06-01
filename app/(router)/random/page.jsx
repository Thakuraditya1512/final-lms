"use client"; // This directive marks the component as a client component

import React from 'react';
import './page.css';
import StarRating from '../StarRating/StarRating';

const people = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
    description: 'John is a software engineer with 10 years of experience in web development.',
    rating: 4,
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
    description: 'Jane is a project manager who specializes in agile methodologies and team leadership.',
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    image: 'https://via.placeholder.com/150',
    description: 'Emily is a UX/UI designer with a keen eye for creating intuitive user experiences.',
    rating: 3,
  },
];

const Page = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Our Team</h1>
      </header>
      <div className="cards-container">
        {people.map((person, index) => (
          <div className="card" key={index}>
            <img src={person.image} alt={`${person.name}`} className="card-image" />
            <div className="card-content">
              <h2>{person.name}</h2>
              <p>{person.description}</p>
              <StarRating rating={person.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
