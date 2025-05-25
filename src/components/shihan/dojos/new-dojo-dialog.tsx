import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import React from 'react';

function NewDojoDialog() {
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
            Create New Dojo
            <DialogDescription className="text-xs text-gray-500"></DialogDescription>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default NewDojoDialog;
