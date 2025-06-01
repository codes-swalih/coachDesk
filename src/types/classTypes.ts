import { Types } from 'mongoose';

export interface DojoSchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string[];
}

export interface IDojo {
  dojoName: string;
  students: Types.ObjectId[];
  location: string;
  schedule: DojoSchedule[];
  shihanId: string;
}
