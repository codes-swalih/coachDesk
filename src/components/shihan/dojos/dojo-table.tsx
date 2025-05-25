import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DojoViewDialog from './dojo-view-dialog/dojo-view-dialog';
import DojoDeleteDialog from './dojo-delete-dialog/dojo-delete-dialog';

function DojoTable() {
  const sensai = [
    {
      name: 'John Doe',
      location: 'Mannarkkad',
      time: '9:00 AM - 10:00 AM',
      days: 'Monday, Wednesday, Friday',
      assignedSensai: 'Aswin Manohar',
      students: '20',
    },
    {
      name: 'John Doe',
      location: 'Mannarkkad',
      time: '9:00 AM - 10:00 AM',
      days: 'Monday, Wednesday, Friday',
      assignedSensai: 'Aswin Manohar',
      students: '20',
    },
    {
      name: 'John Doe',
      location: 'Mannarkkad',
      time: '9:00 AM - 10:00 AM',
      days: 'Monday, Wednesday, Friday',
      assignedSensai: 'Aswin Manohar',
      students: '20',
    },
    {
      name: 'John Doe',
      location: 'Mannarkkad',
      time: '9:00 AM - 10:00 AM',
      days: 'Monday, Wednesday, Friday',
      assignedSensai: 'Aswin Manohar',
      students: '20',
    },
    {
      name: 'John Doe',
      location: 'Mannarkkad',
      time: '9:00 AM - 10:00 AM',
      days: 'Monday, Wednesday, Friday',
      assignedSensai: 'Aswin Manohar',
      students: '20',
    },
  ];

  return (
    <Table>
      <TableHeader className=" bg-[#202020]">
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Days</TableHead>
          <TableHead className="text-right">Assigned Sensai</TableHead>
          <TableHead className="text-right">Students</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sensai.map((sensais, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{sensais.name}</TableCell>
            <TableCell>{sensais.location}</TableCell>
            <TableCell className=" text-blue-500">{sensais.time}</TableCell>
            <TableCell className="text-right">{sensais.days}</TableCell>
            <TableCell className="text-right">{sensais.assignedSensai}</TableCell>
            <TableCell className="text-right">{sensais.students}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-2">
                <DojoViewDialog />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4 text-gray-500" />
                </Button>
                <DojoDeleteDialog />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DojoTable;
