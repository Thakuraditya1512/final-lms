"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import CourseVideoDescription from '../../course-preview/[courseId]/_components/CourseVideoDescription';
import CourseContentSection from '../../course-preview/[courseId]/_components/CourseContentSection';
import { toast } from 'sonner';

function WatchCourse({ params }) {
  const { user } = useUser();
  const [courseInfo, setCourseInfo] = useState(null);
  const [completedChapter, setCompletedChapter] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    if (params && user) {
      getUserEnrolledCourseDetail();
    }
  }, [params, user]);

  const getUserEnrolledCourseDetail = async () => {
    try {
      const resp = await GlobalApi.getUserEnrolledCourseDetails(params.enrollId, user.primaryEmailAddress.emailAddress);
      setCompletedChapter(resp.userEnrollCourses[0]?.completedChapter || []);
      setCourseInfo(resp.userEnrollCourses[0]?.courseList || {});
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const onChapterComplete = async (chapterId) => {
    try {
      const resp = await GlobalApi.markChapterCompleted(params.enrollId, chapterId);
      if (resp) {
        toast('Chapter Marked as completed!');
        getUserEnrolledCourseDetail();
      }
    } catch (error) {
      console.error("Error marking chapter as completed:", error);
    }
  };

  return courseInfo?.name && (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
      <div className='col-span-2 bg-white p-3'>
        <CourseVideoDescription
          courseInfo={courseInfo}
          activeChapterIndex={activeChapterIndex}
          watchMode={true}
          setChapterCompleted={onChapterComplete}
        />
      </div>
      <div>
        <CourseContentSection
          courseInfo={courseInfo}
          isUserAlreadyEnrolled={true}
          watchMode={true}
          completedChapter={completedChapter}
          setActiveChapterIndex={setActiveChapterIndex}
        />
      </div>
    </div>
  );
}

export default WatchCourse;
