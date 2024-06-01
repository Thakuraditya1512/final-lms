"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import SideBanners from '../courses/_components/SideBanners';
import WelcomeBannerDashboard from './_components/WelcomeBannerDashboard';
import InProgressCourseList from './_components/InProgressCourseList';
import GlobalApi from '@/app/_utils/GlobalApi';
// import './Page.css'

function Dashboard() {
  const { user } = useUser();
  const [userEnrolledCourses, setUserEnrolledCourse] = useState([]);
  
  useEffect(() => {
    user && getAllUserEnrolledCourses();
  }, [user]);

  /**
   * Get All User Enrolled Course List
   */
  const getAllUserEnrolledCourses = () => {
    GlobalApi.getUserAllEnrolledCourseList(user.primaryEmailAddress.emailAddress).then(resp => {
      console.log(resp);
      setUserEnrolledCourse(resp.userEnrollCourses);
    });
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-5'>
      {/* Left Container */}
      <div className='md:col-span-2'>
        {/* Banner */}
        <WelcomeBannerDashboard user={user} />
        {/* In Progress Course List */}
        <InProgressCourseList userEnrolledCourses={userEnrolledCourses} />
      </div>
      {/* Right Container */}
      <div className='hidden md:block'>
        <SideBanners />
      </div>
    </div>
  );
}

export default Dashboard;
