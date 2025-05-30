import { Types } from 'mongoose';

export interface IInviteSensai {
  email: string;
  dojos: Types.ObjectId[];
  schedule: {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    time: string[];
  }[];
  startDate: Date;
  message: string;
  status?: 'pending' | 'accepted' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
  shihanId: Types.ObjectId;
}
