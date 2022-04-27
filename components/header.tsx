import { useEffect, useState } from 'react';
import { getActiveMenuItem, NavigationItem } from '../constants/menu-items';

export default function Header() {
  const [activeMenuItem, setActiveMenuItem] = useState<NavigationItem | null>(null);
  useEffect(() => {
    const newItem = getActiveMenuItem();
    setActiveMenuItem(newItem ?? null);
  }, [setActiveMenuItem]);
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{activeMenuItem?.name}</h1>
      </div>
    </header>
  )
}
