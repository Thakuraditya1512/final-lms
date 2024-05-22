"use client";
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { BellDot } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Sun, Moon } from "react-feather";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { ThemeProvider } from 'next-themes'
import { useMediaQuery } from '@react-hook/media-query'; // Import useMediaQuery

function Header() {
  const { user, isLoaded } = useUser();
  const [themeState, setThemeState] = useState("light");
  const isMobile = useMediaQuery('(max-width: 768px)'); // Define your mobile screen width breakpoint

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = localStorage.getItem("theme") || "light"; // get the user theme state from localStorage
      setThemeState(currentTheme);
    }
  }, []);

  return (
    <div>
      {/* Header Content */}
      <div className='p-4 bg-black shadow-md flex justify-between items-center'>
        {/* Logo Placeholder */}
        <div className='flex items-center gap-1'>
  <img src='/logo2.svg' alt='Logo' className='h-12 md:h-16 lg:h-25' />
  <span className='font-bold text-xl text-white md:text-2xl lg:text-3xl'>Learning Destiny</span>
</div>

        {/* Get Started Button & Bell Icon */}
        <div className='flex items-center gap-2'>
          <BellDot className='text-white w-8 h-9 cursor-pointer hover:text-gray-400'/>
          {isLoaded && user ? (
            <UserButton afterSignOutUrl='/courses'/>
          ) : (
            <Link href='/sign-in'>
              <Button className='bg-gray-800 text-white hover:bg-gray-700'>Get Started</Button>
            </Link>
          )}
        </div>
      </div>
      {/* Scrolling Banner */}
    <div className='bg-gradient-to-r from-blue-500 to-green-500 py-2 hidden lg:block'>
  <marquee className='text-white font-bold' behavior='scroll' direction='left'>Welcome to our Learning Destiny.</marquee>
</div>

    </div>
  );
}

export default Header;
