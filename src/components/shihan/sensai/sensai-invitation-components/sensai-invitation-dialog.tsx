import React from 'react';
import { Textarea } from '@/components/ui/textarea';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Mail } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';
import SensaiDateTimeDialog from './sensai-date-time-dialog';

function SensaiInviteDialog() {
  const [date, setDate] = React.useState<Date>();

  const dojosOptiopns = [
    { label: 'Aryambav', value: 'aryambav' },
    { label: 'Kodathippadi', value: 'kodathippadi' },
    { label: 'Mannarkad', value: 'mannarkad' },
    { label: 'Ashupathrippadi', value: 'ashupathrippadi' },
  ];
  const [selectDojo, setSelectDojo] = React.useState<string[]>([]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button asChild className=" flex items-center gap-3">
            <span>
              <Plus /> Invite Sensai
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className=" w-full">
          <DialogHeader>
            <DialogTitle>Send Invitation</DialogTitle>
            <DialogDescription>Invite a new sensai to Manage your class</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-left">
                Email
              </Label>
              <Input
                id="name"
                type="email"
                placeholder="example@gmail.com"
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <Label htmlFor="classes" className=" text-left">
                Dojos
              </Label>
              <h2 className=" text-xs text-gray-500">
                Select the Dojos you want the sensai to handles
              </h2>
              <MultiSelect
                options={dojosOptiopns}
                selected={selectDojo}
                setSelected={setSelectDojo}
                placeholder="Select Dojos"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <Label>Set Days & Time</Label>
              <h1 className=" text-xs text-gray-500">Click The Dojos To Set The Days & Time</h1>
              <div className=" w-full flex flex-wrap gap-5">
                {selectDojo.map((items: any, index: number) => {
                  return <SensaiDateTimeDialog key={index} items={items} />;
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="classes" className=" text-left">
                Start Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="classes" className=" text-left">
                message
              </Label>
              <Textarea cols={20} rows={5} placeholder="Type your message here." />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className=" flex items-center gap-2" asChild>
              <span className=" flex items-center gap-2">
                <Mail /> Send invitation
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SensaiInviteDialog;
