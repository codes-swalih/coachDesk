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
            className={`${isActive ? 'bg-[#303030] px-3 py-2 flex gap-2 items-center rounded-md' : 'bg-none px-3 py-2 flex gap-2 items-center'}`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white ' : 'text-gray-400'}`} />
            <Link
              href={menu.href}
              className={`${isActive ? 'text-white' : 'text-gray-400'} hover:text-white`}
            >
              {menu.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default NavMain;
