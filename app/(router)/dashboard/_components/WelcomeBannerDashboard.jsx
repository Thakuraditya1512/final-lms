import Image from 'next/image';
import React from 'react';

function WelcomeBannerDashboard({ user }) {
  return (
    <div className='bg-purple-100 rounded-sm p-5 flex flex-col md:flex-row gap-5 items-center'>
      <div className="flex-shrink-0">
        <Image 
          src={'/login.jpg'} 
          alt='Aditya'
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
      <div className="mt-4 md:mt-0">
        <h2 className='text-2xl font-semibold md:text-3xl'>Welcome Back, 
          <span className='text-primary'>{user?.fullName}</span>
        </h2>
        <p className='text-sm text-gray-600 md:text-base md:w-80'>
          Let's pick up where you left off and continue your learning journey.
        </p>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
