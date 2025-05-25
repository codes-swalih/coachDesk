import DojoTable from '@/components/shihan/dojos/dojo-table';
import NewDojoDialog from '@/components/shihan/dojos/new-dojo-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import React from 'react';

function page() {
  return (
    <div className=" w-full flex flex-col gap-10">
      <div className=" flex flex-col gap-5">
        <div className=" w-full flex items-center justify-between">
          <h1 className=" text-4xl font-semibold">Dojos</h1>
          <div>
            <div className=" flex items-center gap-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input type="search" placeholder="Search Dojos" className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Saturday</SelectItem>
                  <SelectItem value="active">Sunday</SelectItem>
                  <SelectItem value="pending">Monday</SelectItem>
                </SelectContent>
              </Select>
              <NewDojoDialog />
            </div>
          </div>
        </div>
        <hr />
      </div>
      <DojoTable />
    </div>
  );
}

export default page;
