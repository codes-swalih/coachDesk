'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Menu {
  name: string;
  icon: LucideIcon;
  href: string;
}

function NavMain(props: { menus: Menu[] }) {
  const { menus } = props;
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5">
      {menus.map((menu, index) => {
        const Icon = menu.icon;
        const isActive = pathname === menu.href;

        return (
          <div
            key={index}
            className={`${isActive ? 'dark:bg-[#404040] bg-gray-200 px-3 py-2 flex gap-2 items-center rounded-md' : 'bg-none px-3 py-2 flex gap-2 items-center'}`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'dark:text-white ' : 'dark:text-gray-400'}`} />
            <Link
              href={menu.href}
              className={`${isActive ? 'dark:text-white text-gray-500' : 'dark:text-gray-400 text-gray-400'} `}
            >
              <h1 className=" dark:hover:text-gray-500   ">{menu.name}</h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default NavMain;
