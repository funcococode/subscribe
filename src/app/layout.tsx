'use client'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import Header from '@/components/header';
import {  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800']
})


export const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en" className={`${poppins.className}`}>
          <Head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
          </Head>
          <body className='h-screen'>
              <div className='h-full flex flex-col mx-auto max-w-screen-2xl border-x'>
                <SignedOut>
                  <Header />
                  <div className='flex-1 bg-gray-100/30'>
                    {children}
                  </div>
                </SignedOut>
                <main className='flex-1 flex divide-x '>
                  <Toaster richColors theme='light'/>
                  <SignedIn>
                    <aside className='w-72 relative'>
                      <Sidebar />
                    </aside>
                    <div className='flex-1 bg-gray-100/30'>
                      {children}
                    </div>
                  </SignedIn>
                </main>
              </div>
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
