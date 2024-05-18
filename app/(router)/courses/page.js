"use client"
import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import SideBanners from './_components/SideBanners'

function Courses() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5 gap-5'>
      {/* Left Container */}
      <div className='md:col-span-2 lg:col-span-3'>
        {/* Banner */}
        {/* <WelcomeBanner /> */}
        {/* Course List */}
        <CourseList />
      </div>
      {/* Right Container */}
      <div className='hidden md:block lg:block'>
        <SideBanners />
      </div>
    </div>
  );

}

export default Courses