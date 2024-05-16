import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

function MenuItem({ item, isActive }) {
  return (
    <Link href={item.path}>
      <div
        className={`group flex items-center justify-center py-3 px-4 text-lg cursor-pointer rounded-md transition-all ease-in-out duration-200 ${
          isActive ? 'bg-gray-200 text-black' : 'text-gray-700 hover:bg-gray-100 hover:text-black'
        }`}
      >
        <span className={`transition-colors duration-200 ${isActive ? 'text-black' : 'group-hover:text-black'}`}>
          {item.name}
        </span>
      </div>
    </Link>
  );
}

function SideNav() {
  const { user } = useUser();
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const menu = [
    {
      id: 1,
      name: 'Dashboard',
      path: '/dashboard',
      auth: user,
    },
    {
      id: 2,
      name: 'All Classes',
      path: '/courses',
      auth: true,
    },
    {
      id: 3,
      name: 'Upgrade to Pro',
      path: '/TubegurujiPro',
      auth: true,
    },
    {
      id: 4,
      name: 'Random Page',
      path: '/random',
      auth: true,
    },
    {
      id: 5,
      name: 'Newsletter Subscription',
      path: '/newsletter',
      auth: true,
    },
    {
      id: 6,
      name: 'Join Membership',
      path: '/membership',
      auth: true,
    },
  ];

  useEffect(() => {
    console.log('path', path);
  }, [path]);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ backgroundColor: '#f8f8f8', height: '100vh' }}>
      <div className="logo-container p-4 text-center">
        {/* Replace 'water.svg' with your actual logo */}
        <Image src='/water.svg' alt='logo' width={120} height={120} className="hover:scale-110 transition-transform duration-300" />
      </div>
 
      <div className='menu p-4'>
        {menu.map((item) =>
          item.auth ? (
            <MenuItem key={item.id} item={item} isActive={path.includes(item.path)} />
          ) : null
        )}
      </div>

      {/* Button to toggle theme */}
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

export default SideNav;
