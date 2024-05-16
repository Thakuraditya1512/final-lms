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
    <ThemeProvider attribute='class'>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={themeState}>
        <div style={{ backgroundColor: '#f8f8f8', zIndex: '10' }}>
          <div className='p-4  flex justify-between items-center' style={{ backgroundColor: '#f8f8f8' }}>
            {/* Logo Placeholder */}
            <div className='flex items-center gap-2'>
              <img src='/water.svg' alt='Logo' className='h-10' />
              <span className='font-semibold text-xl'>learning Destiny</span>
            </div>
            {/* Get Started Button & Bell Icon */}
            {!isMobile && (
              <div className='flex items-center gap-4'>
                <div className="theme-toggle-container">
                  {themeState === "light" && (
                    <Sun
                      size={20}
                      color="black"
                      style={{ cursor: "pointer" }}
                      onClick={toggleTheme}
                    />
                  )}

                  {themeState === "dark" && (
                    <Moon
                      size={20}
                      color="white"
                      style={{ cursor: "pointer" }}
                      onClick={toggleTheme}
                    />
                  )}
                </div>
                <BellDot className='text-gray-500' />
                {isLoaded && user
                  ? <UserButton afterSignOutUrl='/courses' />
                  : <Link href='/sign-in'>
                    <Button>Get Started</Button>
                  </Link>}
              </div>
            )}
          </div>
        </div>
      </ThemeSwitcherProvider>
    </ThemeProvider>
  )
}

export default Header;
