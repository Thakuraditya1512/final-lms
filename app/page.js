"use client";
import React, { useState, useEffect } from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { Sun, Moon } from "react-feather";
import { Button } from '@/components/ui/button'
import { ThemeProvider } from 'next-themes'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import GlobalApi from './_utils/GlobalApi'

export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  // Keeps the state of the theme
  const [themeState, setThemeState] = useState("light");

  // light/dark themes related styles css files
  const themes = {
    dark: `dark-theme.css`,
    light: `light-theme.css`,
  };

  /**
   * Gets the theme state on initial load
   * stored in localStorage or if not, set default theme as light theme
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = localStorage.getItem("theme") || "light"; // get the user theme state from localStorage
      setThemeState(currentTheme);
    }
  }, []);

  /**
   * Toggles the theme and keep it in localStorage
   */
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
    if (user) {
      router.push('/dashboard')
    } else {
      isLoaded && router.push('/courses')
    }
  }, [user]);

  return (
    <ThemeProvider attribute='class'> 
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={themeState}>
        <div>
          {/* User authentication button */}
          <div className="user-button-container">
            <UserButton afterSignOutUrl="/sign-in"/>
          </div>

          {/* Dark/light theme toggle button */}
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
        </div>
      </ThemeSwitcherProvider>
    </ThemeProvider>
  );
}
