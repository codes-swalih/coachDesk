import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SensaiViewDialog from './sensai-view-components/view-dialog';
import SensaiDeleteDialog from './sensai-delete-components/sensai-delete-dialog';

const sensai = [
  {
    name: 'John Doe',
    email: 'jon@gmail.com',
    status: 'Active',
    assignedClasses: 10,
    dateJoined: '2021-01-01',
  },
  {
    name: 'John Doe',
    email: 'jon@gmail.com',
    status: 'Active',
    assignedClasses: 10,
    dateJoined: '2021-01-01',
  },
  {
    name: 'John Doe',
    email: 'jon@gmail.com',
    status: 'Active',
    assignedClasses: 10,
    dateJoined: '2021-01-01',
  },
  {
    name: 'John Doe',
    email: 'jon@gmail.com',
    status: 'Active',
    assignedClasses: 10,
    dateJoined: '2021-01-01',
  },
  {
    name: 'John Doe',
    email: 'jon@gmail.com',
    status: 'Active',
    assignedClasses: 10,
    dateJoined: '2021-01-01',
  },
  {
    name: 'John Doe',
    email: 'jon@gmail.com',
    status: 'Active',
    assignedClasses: 10,
    dateJoined: '2021-01-01',
  },
];

export function SensaiTable() {
  return (
    <Table>
      <TableCaption>
        All the Sensais that you assigned and invited to handle your classes.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Assigned Classes</TableHead>
          <TableHead className="text-right">Date Joined</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sensai.map((sensais, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{sensais.name}</TableCell>
            <TableCell>{sensais.email}</TableCell>
            <TableCell>{sensais.status}</TableCell>
            <TableCell className="text-right">{sensais.assignedClasses}</TableCell>
            <TableCell className="text-right">{sensais.dateJoined}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-2">
                <SensaiViewDialog sensaiName={sensais.name} />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4 text-gray-500" />
                </Button>
                <SensaiDeleteDialog />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
