import React, { PropsWithChildren } from 'react';
import Navbar from './navbar';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <div className="min-h-full">
        <Navbar/>
        <main>
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
