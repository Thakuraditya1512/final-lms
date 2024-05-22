// app/layout.js
"use client";
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';
import { UserMemberContext } from './_context/UserMemberContext';
import { UserEnrolledCoursesProvider } from './_context/UserEnrolledCoursesContext';
import { useState } from 'react';

const inter = Outfit({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isMember, setIsMember] = useState(false);
  return (
    <ClerkProvider>
      <UserMemberContext.Provider value={{ isMember, setIsMember }}>
        <UserEnrolledCoursesProvider>
          <html lang="en">
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className={inter.className}>
              {children}
              <Toaster />
            </body>
          </html>
        </UserEnrolledCoursesProvider>
      </UserMemberContext.Provider>
    </ClerkProvider>
  );
}
