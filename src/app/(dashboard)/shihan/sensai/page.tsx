'use client';
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SensaiTable } from '@/components/shihan/sensai/sensai-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SensaiInviteDialog from '@/components/shihan/sensai/sensai-invitation-components/sensai-invitation-dialog';

function page() {
  const overView = [
    {
      name: 'Total Sensai',
      description: 'Active & pending invitation',
      value: 21,
    },
    {
      name: 'Active Sensai',
      description: 'Currently Teaching Classes',
      value: 10,
    },
    {
      name: 'Pending',
      description: 'Waiting for response',
      value: 1,
    },
  ];

  return (
    <div className="flex flex-col gap-10 ">
      <div className=" flex flex-col gap-5">
        <div className=" w-full flex items-center justify-between">
          <h1 className=" text-4xl font-semibold">Sensai Overview</h1>
          <div className=" flex items-center gap-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input type="search" placeholder="Search Sensai" className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sensai</SelectItem>
                <SelectItem value="active">Active Sensai</SelectItem>
                <SelectItem value="pending">Pending Sensai</SelectItem>
              </SelectContent>
            </Select>
            <SensaiInviteDialog />
          </div>
        </div>
        <hr />
      </div>
      <div className=" grid grid-cols-3 gap-10">
        {overView.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className=" h-52 dark:bg-[#303030] bg-gray-200 rounded-md p-10 flex flex-col gap-5"
            >
              <div className=" flex flex-col gap-1">
                <h1 className=" text-3xl font-semibold">{item.name}</h1>
                <h1 className=" dark:text-gray-400 text-black">{item.description}</h1>
              </div>
              <h1 className=" text-4xl dark:text-gray-300 font-semibold">{item.value}</h1>
            </div>
          );
        })}
      </div>
      <SensaiTable />
    </div>
  );
}

export default page;
