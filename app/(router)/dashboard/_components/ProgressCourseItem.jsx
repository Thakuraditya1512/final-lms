import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CircularProgressBar from './CircularProgressBar';

function ProgressCourseItem({ course }) {
  const getTotalCompletedChapterPerc = (item) => {
    const perc = (item.completedChapter?.length / item?.courseList?.chapter?.length) * 100;
    return perc.toFixed(0);
  };

  return (
    <Link href={"/course-preview/"+course?.courseList?.slug}>
      <div className='border rounded-md bg-gradient-to-r from-red-500 to-yellow-500 hover:shadow-md hover:shadow-purple-300 cursor-pointer'>
        <Image
          src={course.courseList?.banner?.url}
          width={500}
          height={150}
          alt='banner'
          className='rounded-t-md h-[130px] object-cover'
        />
        <div className='flex flex-col gap-1 p-2'>
          <h2 className='font-medium'>{course.courseList?.name}</h2>
          <h2 className='text-[12px] text-gray-400'>{course.courseList?.author}</h2>
          <div className='flex items-center'>
            <CircularProgressBar progress={getTotalCompletedChapterPerc(course)} />
            <p className='text-[12px] text-gray-400 ml-2'>
              {getTotalCompletedChapterPerc(course)}% Completed
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProgressCourseItem;
