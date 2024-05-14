// Layout.jsx
"use client";
import React, { useContext, useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';
import { UserMemberContext } from '../_context/UserMemberContext';

function Layout({ children }) {
  const { user } = useUser();
  const { isMember, setIsMember } = useContext(UserMemberContext);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    user && checkUserMembership();
  }, [user]);

  /**
   * Used to check user membership
   */
  const checkUserMembership = () => {
    GlobalApi.checkForMembership(user.primaryEmailAddress.emailAddress).then((resp) => {
      console.log(resp);
      if (resp?.memberships?.length > 0) {
        console.log('Its Member');
        setIsMember(true);
      }
    });
  };

  return (
    <div>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className={`mobile-sidebar-toggle md:hidden fixed top-5 right-5 z-50 bg-white p-2 rounded-lg shadow-md transition-all duration-300 ${
          isMobileSidebarOpen ? 'transform rotate-45' : ''
        }`}
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* SideNav */}
      <div className={`md:w-64 fixed md:block ${isMobileSidebarOpen ? 'block' : 'hidden'}`}>
        <SideNav />
      </div>

      {/* Main Content */}
      <div className='md:ml-64'>
        <Header />
        <div className='w-full'>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
