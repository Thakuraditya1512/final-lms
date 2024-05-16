import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { FaUserCircle } from 'react-icons/fa'; // Import the Avatar component from react-icons
import './styles/SideNav.css';
import { SignOutButton } from "@clerk/nextjs";
function MenuItem({ item, isActive, isLoaded }) {
  const { user } = useUser();

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

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
  const { user, isLoaded } = useUser();
  console.log(user);
  // console.log(user.imageUrl)
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
<div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ backgroundColor: '#f8f8f8', height: '100vh', display: 'flex', flexDirection: 'column' }}>
  <div className="logo-container p-4 text-center">
    {/* Replace 'water.svg' with your actual logo */}
    <div className="relative">
      {user && isLoaded ? (
        <div className="mt-4 text-center">
          <div className="mt-4">
            {user.imageUrl ? (
              <Image src={user.imageUrl} alt="User Image" width={80} height={80} className="rounded-full mx-auto" />
            ) : (
              <img src="/guestImage.jpg" alt="Guest Image" width={80} height={80} className="rounded-full mx-auto" />
            )}
            <h2 className="mt-2 text-lg font-bold">{user.fullName || user.username || "Guest"}</h2>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <FaUserCircle size={80} color="#333" /> {/* FaUserCircle icon */}
            <h2 className="mt-2 text-lg font-bold">Guest</h2> {/* Guest text */}
          </div>
          <Link href="/sign-in" passHref>
            <Button>Login</Button> {/* Login button */}
          </Link>
        </div>
      )}
    </div>
  </div>

  <div className='menu p-4 flex-grow'>
    {menu.map((item) =>
      item.auth ? (
        <MenuItem key={item.id} item={item} isActive={path.includes(item.path)} isLoaded={isLoaded} />
      ) : null
    )}
 {user && isLoaded && (
      <div className="mt-4 flex flex-col items-center justify-center">
        <Link href='/courses'>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
        </Link>
      </div>
    )}
  </div>

  {/* Button to toggle theme */}
  {/* Add your toggle theme button here */}
</div>


  
  );
}

export default SideNav;
