import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Assessment',
    path: '/assessment',
    icon: <Icon icon="mdi:document-sign" width="24" height="24" />,
  },
  // {
  //   title: 'Projects',
  //   path: '/projects',
  //   icon: <Icon icon="lucide:folder" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'All', path: '/projects' },
  //     { title: 'Web Design', path: '/projects/web-design' },
  //     { title: 'Graphic Design', path: '/projects/graphic-design' },
  //   ],
  // },
  {
    title: 'To Do',
    path: '/to-do',
    icon: <Icon icon="lucide:list-todo" width="24" height="24" />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  // {
  //   title: 'Help',
  //   path: '/help',
  //   icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  // },
];