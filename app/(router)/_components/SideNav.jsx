// SideNav.jsx
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { BadgeCheck, BookOpen, LayoutDashboard, LayoutGrid, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function MenuItem({ item, isActive }) {
  return (
    <Link href={item.path}>
      <div
        className={`group flex gap-3 mt-2 p-3 text-[18px] items-center text-white cursor-pointer  rounded-md transition-all ease-in-out duration-200 ${
          isActive && 'bg-primary text-white'
        }`}
      >
        <item.icon className='group-hover:animate-bounce' />
        <h2>{item.name}</h2>
      </div>
    </Link>
  );
}

function SideNav() {
  const { user } = useUser();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menu = [
    {
      id: 8,
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      auth: user,
    },
    {
      id: 1,
      name: 'All Courses',
      icon: BookOpen,
      path: '/courses',
      auth: true,
    },
    {
      id: 2,
      name: 'Learning Destiny Pro',
      icon: BadgeCheck,
      path: '/tubeguruji-pro',
      auth: true,
    },
    {
      id: 7,
      name: 'Quiz',
      icon: LayoutGrid,
      path: '/Quiz',
      auth: true,
    },
    {
      id: 5,
      name: 'Newsletter',
      icon: Mail,
      path: '/newsletter',
      auth: true,
    },
    {
      id: 4,
      name: 'Join us',
      icon: LayoutGrid,
      path: '/store',
      auth: true,
    },
  ];

  useEffect(() => {
    console.log('path', path);
  }, []);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ backgroundColor: '#102C57', height: '100vh' }}>
      <div className="logo-container">
        {/* <Image src='/logo.svg' alt='logo' width={150} height={60} /> */}
      </div>
      <button className="toggle-button" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className='menu'>
        {menu.map((item) =>
          item.auth ? (
            <MenuItem key={item.id} item={item} isActive={path.includes(item.path)} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default SideNav;
