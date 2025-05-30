'use client';

import * as React from 'react';
import { BookOpenCheck, BotIcon, FrameIcon, GalleryVerticalEndIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import NavMain from './nav-main';
import ThemeToggle from './theme-toggle';

// This is sample data.

const navigations = [
  { name: 'Dashboard', icon: FrameIcon, href: '/shihan' },
  { name: 'Sensai', icon: BookOpenCheck, href: '/shihan/sensai' },
  { name: 'Dojos', icon: GalleryVerticalEndIcon, href: '/shihan/dojos' },
  { name: 'Students', icon: BotIcon, href: '/shihan/students' },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className=" pt-10 px-5">
        <h1 className=" text-xl uppercase font-bold dark:text-gray-500 ">coach desk</h1>
      </SidebarHeader>
      <SidebarContent className=" px-5 mt-10">
        <NavMain menus={navigations} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
