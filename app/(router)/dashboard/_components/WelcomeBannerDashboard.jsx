import Image from 'next/image';
import React from 'react';

function WelcomeBannerDashboard({ user }) {
  const imageSrc = '/login.jpg';
  const description = "Let's pick up where you left off and continue your learning journey.";

  return (
    <div className='bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg p-5 flex flex-col md:flex-row gap-5 items-center'>
      <div className="flex-shrink-0">
        <Image 
          src={imageSrc} 
          alt='User Avatar'
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
      <div className="mt-4 md:mt-0 flex-1">
        <h2 className='text-2xl font-semibold md:text-3xl'>Welcome Back, 
          <span className='text-purple-100'> {user?.fullName}</span>
        </h2>
        <p className='text-sm text-white md:text-base md:w-80 mt-2'>
          {description}
        </p>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
