// _context/UserEnrolledCoursesContext.js
import React, { createContext, useState, useContext } from 'react';

const UserEnrolledCoursesContext = createContext();

export const UserEnrolledCoursesProvider = ({ children }) => {
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);

  const addUserEnrolledCourse = (course) => {
    setUserEnrolledCourses((prevCourses) => [...prevCourses, course]);
  };

  return (
    <UserEnrolledCoursesContext.Provider value={{ userEnrolledCourses, addUserEnrolledCourse }}>
      {children}
    </UserEnrolledCoursesContext.Provider>
  );
};

export const useUserEnrolledCourses = () => useContext(UserEnrolledCoursesContext);
