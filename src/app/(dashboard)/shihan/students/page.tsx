import SensaiInviteDialog from '@/components/shihan/sensai/sensai-invitation-components/sensai-invitation-dialog';
import StudentTable from '@/components/shihan/students/students-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import React from 'react';

function page() {
  return (
    <div className=" flex flex-col gap-10">
      <div className=" flex flex-col gap-5">
        <div className=" w-full flex items-center justify-between">
          <h1 className=" text-4xl font-semibold">Students Overview</h1>
          <div className=" flex items-center gap-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input type="search" placeholder="Search Student" className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Dojos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Mannarkkad Dojo</SelectItem>
                <SelectItem value="active">Kodathippadi Dojo</SelectItem>
                <SelectItem value="pending">Aryambav Dojo</SelectItem>
              </SelectContent>
            </Select>
            <SensaiInviteDialog />
          </div>
        </div>
        <hr />
      </div>
      <StudentTable />
    </div>
  );
}

export default page;
