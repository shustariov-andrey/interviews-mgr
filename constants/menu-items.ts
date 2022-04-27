import { MenuItem } from '../features/menu/menu-item';

export interface NavigationItem {
  key: MenuItem;
  name: string;
  path: string;
  fullPathMatch: boolean;
}

export const menuItems: NavigationItem[] = [
  { key: MenuItem.Home, name: 'Interviews', path: '/', fullPathMatch: true },
];

export const getActiveMenuItem = () => {
  return menuItems.find(item => item.fullPathMatch
    ? location.pathname === item.path
    : location.pathname.startsWith(item.path),
  );
}
