import React, { PropsWithChildren, useEffect, useState } from 'react';
import { getActiveMenuItem, NavigationItem } from '../../lib/menu/menu-items';

const Header: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState<NavigationItem | null>(null);
  useEffect(() => {
    const newItem = getActiveMenuItem();
    setActiveMenuItem(newItem ?? null);
  }, [setActiveMenuItem]);
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{activeMenuItem?.name}</h1>
        {children}
      </div>
    </header>
  )
}

export default Header;
