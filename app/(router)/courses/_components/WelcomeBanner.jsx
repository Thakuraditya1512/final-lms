import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='flex flex-col md:flex-row gap-5 items-center bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl p-8'>
      <div className='md:flex-shrink-0'>
        <Image src='/this.svg' alt='panda' width={120} height={130} />
      </div>
      <div>
        <h2 className='font-bold text-2xl md:text-3xl'>
          Welcome to <span className='text-primary'>Learning Destiny</span>
        </h2>
        <p className='text-gray-500 text-sm md:text-base'>
          Your go-to platform for online learning.
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner