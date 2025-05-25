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
      </DialogContent>
    </Dialog>
  );
}

export default DojoViewDialog;
