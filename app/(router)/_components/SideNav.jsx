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
import { Sun, Moon } from "react-feather";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { ThemeProvider } from 'next-themes'

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
 // Keeps the state of the theme
 const [themeState, setThemeState] = useState("light");

 // light/dark themes related styles css files
 const themes = {
   dark: `dark-theme.css`,
   light: `light-theme.css`,
 };


  const toggleTheme = () => {
    if (themeState === "dark") {
      localStorage.setItem("theme", "light");
      setThemeState("light");
    } else {
      localStorage.setItem("theme", "dark");
      setThemeState("dark");
    }
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // const toggleTheme = () => {
  //   setTheme(theme === 'light' ? 'dark' : 'light');
  // };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = localStorage.getItem("theme") || "light"; // get the user theme state from localStorage
      setThemeState(currentTheme);
    }
  }, []);
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
    <ThemeProvider attribute='class'> 
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={themeState}>
<div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ backgroundColor: '#f8f8f8', height: '100vh', display: 'flex', flexDirection: 'column',zIndex:'100' }}>
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
     <div className="mt-4 flex bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md flex-col items-center justify-center"  onClick={toggleTheme}
    style={{ cursor: "pointer" }}>




    Change Theme

  </div>
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


</ThemeSwitcherProvider>
    </ThemeProvider>
  );
}

export default SideNav;
