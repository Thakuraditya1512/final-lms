"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription'
import GlobalApi from '@/app/_utils/GlobalApi'
import CourseEnrollSection from './_components/CourseEnrollSection'
import CourseContentSection from './_components/CourseContentSection'
import { useUser } from '@clerk/nextjs'
import WatchOnYoutube from './_components/WatchOnYoutube'
import Sources from './_components/Sources'

function CoursePreview({params}) {
    // const courseId = "clwbvdo3i0eni07pojgbwivyu"
    console.log('paramas',params);
    const {user}=useUser();
    const [courseInfo,setCourseInfo]=useState();
    const [isUserAlreadyEnrolled,setIsUserAlreadyEnrolled]=useState();
    useEffect(()=>{
        params&&getCourseInfoById();
    },[params])

    useEffect(()=>{
      courseInfo&&user&&checkUserEnrolledToCourse();
    },[courseInfo,user])
    /**
     * used to get Course Info By Slug/Id Name
     */
    const getCourseInfoById=()=>{
     
        GlobalApi.getCourseById(params?.courseId).then(resp=>{
            setCourseInfo(resp?.courseList);
            
            
        })
    }

    /**
     * To CHeck user already enrolled to course
     */
    const checkUserEnrolledToCourse=()=>{
      GlobalApi.checkUserEnrolledToCourse(courseInfo.slug,user.primaryEmailAddress.emailAddress)
      .then(resp=>{
        console.log(resp)
        if(resp?.userEnrollCourses)
        {
          
            setIsUserAlreadyEnrolled(resp?.userEnrollCourses[0]?.id);
        }
      })
    }
  return courseInfo&&(
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
       {/* Title Video, Description */}
       
       <div className='col-span-2 bg-white p-3'>
            <CourseVideoDescription courseInfo={courseInfo} />
       </div>

       {/* Course Content  */}
       <div>

            {/* Enroll Section for Chapter Course   */}
            {courseInfo.chapter?.length>0 
            ?<CourseEnrollSection courseInfo={courseInfo}
            isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
            :
              <WatchOnYoutube courseInfo={courseInfo}/>}
            
              {/* Sources Like Github, Demo, Youtube  */}
              <Sources courseInfo={courseInfo}/>

              {/* Course Content /Chapters section  */}
           {courseInfo.chapter?.length>0 && <CourseContentSection courseInfo={courseInfo}
            isUserAlreadyEnrolled={isUserAlreadyEnrolled} />}
       </div>
    </div>
  )
}

export default CoursePreview