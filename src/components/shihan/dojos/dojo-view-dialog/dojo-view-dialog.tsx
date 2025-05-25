import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar, Eye } from 'lucide-react';

function DojoViewDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye size={20} className=" text-blue-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="capitalize w-full flex flex-col gap-2 -mt-5">
            <DialogDescription className="text-xs text-gray-500"></DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className=" flex flex-col gap-2">
            <h1 className="text-xl font-semibold uppercase">Kodathippadi Dojo</h1>
            <hr />
          </div>
          <div className=" w-full flex flex-wrap gap-x-10 gap-y-5">
            <div className=" flex flex-col gap-1">
              <h1 className=" text-xs text-gray-500">Dojos</h1>
              <h1>Champions Club Mannarkkad</h1>
            </div>
            <div className=" flex flex-col gap-1">
              <h1 className=" text-xs text-gray-500">Location</h1>
              <h1>Mannarkkad</h1>
            </div>
            <div className=" flex flex-col gap-1">
              <h1 className=" text-xs text-gray-500">Total Students</h1>
              <h1>20</h1>
            </div>
          </div>
          <div className=" flex flex-col gap-5 mt-5">
            <div className=" flex flex-col gap-2">
              <h1 className=" text-lg capitalize font-semibold">Day & Time</h1>
              <hr />
              <div className=" flex flex-col gap-5 ">
                <div className=" flex flex-col gap-1">
                  <h1 className=" flex items-center gap-2">
                    <Calendar size={15} /> Saturday
                  </h1>
                  <div className=" flex flex-wrap text-sm text-gray-500 items-center gap-x-5 gap-y-1">
                    <h1>10:00 AM - 11:00 PM</h1>
                    <h1>10:00 AM - 11:00 PM</h1>
                  </div>
                </div>
                <div className=" flex flex-col gap-1">
                  <h1 className=" flex items-center gap-2">
                    <Calendar size={15} /> Sunday
                  </h1>

                  <div className=" flex flex-wrap text-sm text-gray-500 items-center gap-x-5 gap-y-1">
                    <h1>10:00 AM - 11:00 PM</h1>
                    <h1>10:00 AM - 11:00 PM</h1>
                    <h1>10:00 AM - 11:00 PM</h1>
                  </div>
                </div>
                <div className=" flex flex-col gap-1">
                  <h1 className=" flex items-center gap-2">
                    <Calendar size={15} /> Monday
                  </h1>

                  <div className=" flex flex-wrap text-sm text-gray-500 items-center gap-x-5 gap-y-1">
                    <h1>10:00 AM - 11:00 PM</h1>
                  </div>
                </div>
                <div className=" flex flex-col gap-1">
                  <h1 className=" flex items-center gap-2">
                    <Calendar size={15} /> Tuesday
                  </h1>

                  <div className=" flex flex-wrap text-sm text-gray-500 items-center gap-x-5 gap-y-1">
                    <h1>10:00 AM - 11:00 PM</h1>
                    <h1>10:00 AM - 11:00 PM</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DojoViewDialog;
