import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import player from '@/assets/player.jpg';

function SensaiViewDialog({ sensaiName }: { sensaiName: string }) {
  const Dojos = ['Aryambav', 'Kodathippadi', 'Mannarkkad', 'SreeKrishnapuram'];
  return (
    <Dialog>
      <DialogTrigger>
        <Eye size={20} className=" text-blue-500" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <div className=" flex flex-col gap-10">
          <div className=" flex items-center gap-5">
            <div className=" w-24 h-24 rounded-full bg-black">
              <Image alt="" src={player} className=" w-full h-full object-cover rounded-full" />
            </div>
            <div className=" flex items-end gap-5">
              <DialogHeader>
                <DialogTitle className="capitalize w-full flex flex-col gap-2 -mt-5">
                  {sensaiName}{' '}
                  <DialogDescription className="text-xs text-gray-500">{`(Black belt)`}</DialogDescription>
                </DialogTitle>
              </DialogHeader>
              <span className=" w-24 py-1 rounded-full bg-green-700 text-xs flex justify-center">
                Active
              </span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-x-10 gap-y-5">
            <div className=" flex flex-col gap-1">
              <span className=" text-gray-500 text-xs">Name</span>
              <span className=" text-white text-sm">{sensaiName}</span>
            </div>
            <div className=" flex flex-col gap-1">
              <span className=" text-gray-500 text-xs">Email</span>
              <span className=" text-white text-sm">John@gmail.com</span>
            </div>
            <div className=" flex flex-col gap-1">
              <span className=" text-gray-500 text-xs">Phone</span>
              <span className=" text-white text-sm">+91 7736447760</span>
            </div>
            <div className=" flex flex-col gap-1">
              <span className=" text-gray-500 text-xs">Joined Date</span>
              <span className=" text-white text-sm">24-01-2003</span>
            </div>
            <div className=" flex flex-col gap-1">
              <span className=" text-gray-500 text-xs">Total Assigned Classes</span>
              <span className=" text-white text-sm">3</span>
            </div>
          </div>

          <div className=" flex flex-col gap-5">
            <div className=" flex flex-col gap-2">
              <h1 className="font-semibold">Listed Classes</h1>
              <hr />
            </div>
            {Dojos.map((dojo: string, index: number) => {
              return (
                <div className=" flex flex-col gap-1">
                  <div className=" flex items-center gap-2">
                    <h1 className=" text-gray-500">{index + 1}.</h1>
                    <h1>{dojo}</h1>
                  </div>
                  <div className="text-xs text-gray-500 flex ml-4 items-center w-full gap-y-2 gap-x-5  flex-wrap">
                    <h1>{`(Saturaday - 10:00 AM - 11:00 AM)`}</h1>
                    <h1>{`(Saturaday - 10:00 AM - 11:00 AM)`}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SensaiViewDialog;
