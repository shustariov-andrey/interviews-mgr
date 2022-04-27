import React from 'react';
import Header from './header';
import Navbar from './navbar'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <Header />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
