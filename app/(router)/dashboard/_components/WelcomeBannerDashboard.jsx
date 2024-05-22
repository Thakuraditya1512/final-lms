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
      setTextColor(currentIndex === 0 || currentIndex === 3 ? 'Yellow' : 'black');
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  return (
    <div className="bg-gray-200 rounded-lg p-2 flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mr-4 md:mr-0 md:mb-0" style={{ width: '200px', height: '200px' }}>
        <img 
          src={bannerImage}
          alt="User Avatar"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
      <div className="mt-4 md:mt-0 flex-1">
        <h2 className={`text-2xl font-semibold md:text-3xl text-${textColor}`}>Welcome Back, 
          <span className={`text-${textColor === 'Black' ? 'Yellow' : 'Green'}-100`}> {user?.fullName}</span>
        </h2>
        <p className={`text-sm md:text-base md:w-80 mt-2 text-${textColor}`}>
          Let's pick up where you left off and continue your learning journey.
        </p>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
