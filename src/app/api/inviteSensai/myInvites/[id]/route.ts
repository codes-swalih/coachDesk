import connectToDB from '@/configs/mongodb';
import InviteSensai from '@/models/shihan/InviteSensaiModel';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDB();
    const myInvites = await InviteSensai.find({ shihanId: id }).populate('shihanId').populate('dojos');
    if (myInvites.length === 0) return new Response("You don't have any invites", { status: 404 });

    return NextResponse.json(
      {
        status: 'Success',
        message: 'You have successfully fetched your invites',
        invites: myInvites,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in fetching invites', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
