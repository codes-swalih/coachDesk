'use client';
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
import DojoViewDialog from '../dojos/dojo-view-dialog/dojo-view-dialog';
import DojoDeleteDialog from '../dojos/dojo-delete-dialog/dojo-delete-dialog';

function StudentTable() {
  const students = [
    {
      name: 'Muhammed swalih',
      Contact: '+91 7736447760',
      cls: 'Araymbav dojo',
      age: '24',
      belt: 'Orange',
    },
    {
      name: 'Muhammed swalih',
      Contact: '+91 7736447760',
      cls: 'Araymbav dojo',
      age: '24',
      belt: 'Orange',
    },
    {
      name: 'Muhammed swalih',
      Contact: '+91 7736447760',
      cls: 'Araymbav dojo',
      age: '24',
      belt: 'Orange',
    },
    {
      name: 'Muhammed swalih',
      Contact: '+91 7736447760',
      cls: 'Araymbav dojo',
      age: '24',
      belt: 'Orange',
    },
    {
      name: 'Muhammed swalih',
      Contact: '+91 7736447760',
      cls: 'Araymbav dojo',
      age: '24',
      belt: 'Orange',
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Student Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Class</TableHead>
          <TableHead className="text-right">Age</TableHead>
          <TableHead className="text-right">Belt</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((std, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{std.name}</TableCell>
            <TableCell>{std.Contact}</TableCell>
            <TableCell>{std.cls}</TableCell>
            <TableCell className="text-right">{std.age}</TableCell>
            <TableCell className="text-right">{std.belt}</TableCell>
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

export default StudentTable;
