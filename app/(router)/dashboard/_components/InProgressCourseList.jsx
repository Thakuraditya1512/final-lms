import React from 'react'
import ProgressCourseItem from './ProgressCourseItem'

function InProgressCourseList({ userEnrolledCourses }) {
  return (
    <div className='p-5 bg-white mt-3 rounded-sm'>
      <h2 className='text-primary text-[18px] font-semibold'>Recent Enrolled Courses</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-3'>
        {userEnrolledCourses.length > 0 ? (
          userEnrolledCourses.map((item, index) => (
            <ProgressCourseItem key={index} course={item} />
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='h-[150px] w-[200px] bg-slate-200 animate-pulse'></div>
          ))
        )}
      </div>
    </div>
  )
}

export default InProgressCourseList
