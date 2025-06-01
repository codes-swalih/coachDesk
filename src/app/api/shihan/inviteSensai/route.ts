import connectToDB from '@/configs/mongodb';
import { sendInvitationEmail } from '@/lib/emailTemplates';
import InviteSensai from '@/models/shihan/InviteSensaiModel';
import { IInviteSensai } from '@/types/shihan/inviteType';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body: IInviteSensai = await req.json();
  const { email, dojos, schedule, startDate, message, status, shihanId } = body;
  try {
    const isAlreadyInvited = await InviteSensai.findOne({ email, dojos, schedule, shihanId });
    if (isAlreadyInvited) {
      return NextResponse.json(
        { status: 'Failed', message: 'You already invited this shihan' },
        { status: 400 }
      );
    }
    const newInvite = await InviteSensai.create({
      email,
      dojos,
      schedule,
      startDate,
      message,
      status,
      shihanId,
    });
    sendInvitationEmail(newInvite);
    return NextResponse.json(
      {
        status: 'Success',
        message: 'You have successfully invited this shihan',
        newInvitedSensai: newInvite,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('Error while inviting shihan :', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const invites = await InviteSensai.find().populate('dojos').populate('shihanId');
    if (invites.length === 0)
      return NextResponse.json(
        { status: 'Failed', message: 'No invitations found' },
        { status: 404 }
      );
    return NextResponse.json({ status: 'Success', totalInvitations: invites }, { status: 200 });
  } catch (error: any) {
    console.log('Error while getting invitations :', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
