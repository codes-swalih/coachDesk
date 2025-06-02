import connectToDB from '@/configs/mongodb';

import InviteSensai from '@/models/shihan/InviteSensaiModel';
import { IInviteSensai } from '@/types/shihan/inviteType';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const body: IInviteSensai = await req.json();
  const { email, dojos, schedule, startDate, message, status } = body;
  try {
    await connectToDB();
    const updatedInvite = await InviteSensai.findByIdAndUpdate(
      id,
      {
        email,
        dojos,
        schedule,
        startDate,
        message,
        status,
      },
      { new: true }
    );
    if (!updatedInvite) {
      return NextResponse.json(
        { status: 'Failed', message: 'Invitation not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { status: 'Success', message: 'Invitation updated successfully', updatedInvite },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in updating invitation', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDB();
    const deletedInvite = await InviteSensai.findByIdAndDelete(id);
    if (!deletedInvite) {
      return NextResponse.json(
        { status: 'Failed', message: 'Invitation not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { status: 'Success', message: 'Invitation deleted successfully', deletedInvite },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in deleting invitation', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDB();
    const invite = await InviteSensai.findById(id).populate('dojos');
    if (!invite) {
      return NextResponse.json(
        { status: 'Failed', message: 'Invitation not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { status: 'Success', message: 'Invitation fetched successfully', invite },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in fetching invitation', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
