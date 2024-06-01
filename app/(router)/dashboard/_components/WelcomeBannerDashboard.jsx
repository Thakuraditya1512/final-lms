import React, { useState, useEffect } from 'react';

function WelcomeBannerDashboard({ user }) {
  const [bannerImage, setBannerImage] = useState('/image-learn.webp');
  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    const images = ['/image-learn.webp']; // Add URLs of your images
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setBannerImage(images[currentIndex]);
      setTextColor(currentIndex === 0 || currentIndex === 3 ? 'yellow' : 'black');
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mr-4 md:mr-6">
        <img 
          src={bannerImage}
          alt="User Avatar"
          width={200}
          height={200}
          className="rounded-full border-4 border-white"
        />
      </div>
      <div className="mt-4 md:mt-0 flex-1 text-center md:text-left">
        <h2 className={`text-3xl font-bold md:text-4xl text-${textColor}`}>
          Welcome Back, <span className="text-white">{user?.fullName}</span>
        </h2>
        <p className={`text-md md:text-lg mt-2 text-${textColor}`}>
          Let's pick up where you left off and continue your learning journey.
        </p>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
