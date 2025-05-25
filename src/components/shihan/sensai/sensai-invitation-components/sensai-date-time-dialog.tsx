'use client';
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Trophy } from 'lucide-react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { MultiSelect } from '@/components/ui/multi-select';

function SensaiDateTimeDialog({ items }: { items: string }) {
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

  useEffect(() => {
    console.log(selectDays);
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button asChild className=" px-4 py-2 hover:scale-105 cursor-pointer bg-white rounded-md">
            <div className=" flex items-center gap-2">
              <h1 className=" uppercase text-xs">{items}</h1>
              <ArrowRight size={15} className=" text-black " />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle className="uppercase flex items-center gap-2">
              {items} Dojo <Trophy size={20} />
            </DialogTitle>
            <DialogDescription>Allot the date and time for the {items}</DialogDescription>
          </DialogHeader>

          <div className=" flex flex-col gap-1 w-1/2">
            <Label className=" text-sm">Select Days</Label>
            <MultiSelect
              options={daysOptions}
              selected={selectDays}
              setSelected={setSelectDays}
              placeholder="Select Days"
            />
          </div>

          <div className=" mt-10 flex flex-col gap-5">
            <h1 className=" text-lg font-semibold">Selected Days</h1>
            <hr />
            <div className=" flex flex-wrap gap-5">
              {selectDays.map((day: string, index: number) => (
                <div key={index} className=" flex flex-col gap-10">
                  <div className=" flex flex-wrap gap-5 w-full">
                    <div className=" flex flex-col gap-1 w-full">
                      <Label className=" text-sm capitalize">
                        Select Time For <span className=" text-blue-500">{day}</span>
                      </Label>
                      <MultiSelect
                        options={timeOptions}
                        selected={selectTime}
                        setSelected={setSelectTime}
                        placeholder="Select Time"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {selectDays.length <= 0 && (
                <div className=" text-xs text-gray-500 capitalize">Please select Some days</div>
              )}
            </div>
          </div>

          <div className=" mt-10 flex flex-col gap-5">
            <h1 className=" text-lg font-semibold">Allotted Days & Time</h1>
            <hr />

            {selectDays.map((day: string, index: number) => {
              return (
                <div key={index} className=" flex flex-col gap-5 text-sm">
                  <div className=" flex flex-col gap-5">
                    <h1 className=" capitalize flex items-center gap-2">
                      <CalendarDays size={15} /> {day}
                    </h1>
                    <div className=" flex flex-wrap gap-5">
                      {selectTime.map((time: string, index: number) => {
                        return (
                          <h1
                            key={index}
                            className=" flex items-center gap-2 px-3 py-2 border rounded-md"
                          >
                            <span className=" text-blue-500">{time}</span>
                          </h1>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            {selectDays.length <= 0 && (
              <div className=" text-xs text-gray-500 capitalize">
                Please select Some days & Time
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                return;
              }}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SensaiDateTimeDialog;
