'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Plus } from 'lucide-react';
import React from 'react';

function NewDojoDialog() {
  const daysOptions = [
    { label: 'Saturday', value: 'saturday' },
    { label: 'Sunday', value: 'sunday' },
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'thursday' },
    { label: 'Friday', value: 'friday' },
  ];

  const timeOptions = [
    { label: '10:00 AM', value: '10:00 AM' },
    { label: '11:00 AM', value: '11:00 AM' },
    { label: '12:00 PM', value: '12:00 PM' },
    { label: '1:00 PM', value: '1:00 PM' },
    { label: '2:00 PM', value: '2:00 PM' },
    { label: '3:00 PM', value: '3:00 PM' },
    { label: '4:00 PM', value: '4:00 PM' },
    { label: '5:00 PM', value: '5:00 PM' },
    { label: '6:00 PM', value: '6:00 PM' },
    { label: '7:00 PM', value: '7:00 PM' },
    { label: '8:00 PM', value: '8:00 PM' },
    { label: '9:00 PM', value: '9:00 PM' },
    { label: '10:00 PM', value: '10:00 PM' },
    { label: '11:00 PM', value: '11:00 PM' },
  ];

  const [selectDays, setSelectDays] = React.useState<string[]>([]);
  const [selectTime, setSelectTime] = React.useState<string[]>([]);
  return (
    <Dialog>
      <DialogTrigger>
        <Button asChild className="flex items-center gap-2">
          <div>
            <Plus />
            Create Dojo
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="capitalize w-full flex flex-col gap-2">
            Add New Dojo
            <DialogDescription className="text-xs text-gray-500"></DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className=" flex flex-col gap-5">
          <div className=" flex flex-col gap-1">
            <Label className=" text-sm text-gray-500">Dojo Name</Label>
            <Input placeholder="Dojo name" />
          </div>
          <div className=" flex flex-col gap-1">
            <Label className=" text-sm text-gray-500">Location</Label>
            <Input placeholder="Location" />
          </div>
          <div className=" flex flex-col gap-1">
            <Label className=" text-sm text-gray-500">Days</Label>
            <MultiSelect
              options={daysOptions}
              selected={selectDays}
              setSelected={setSelectDays}
              placeholder="Select Days"
            />
          </div>
          <div className=" flex flex-col gap-1">
            <Label className=" text-sm text-gray-500">Time</Label>
            <MultiSelect
              options={timeOptions}
              selected={selectTime}
              setSelected={setSelectTime}
              placeholder="Select Time"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className=" w-1/3">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewDojoDialog;
