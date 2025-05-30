import connectToDB from '@/configs/mongodb';
import Dojos from '@/models/DojoModel';
import InviteSensai from '@/models/shihan/InviteSensaiModel';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDB();
    const dojos = await Dojos.find({ shihanId: id }).populate('shihanId');
    const invitations = await InviteSensai.find({ shihanId: id })
      .populate('shihanId')
      .populate('dojos');

    if (dojos.length === 0) {
      return NextResponse.json({ message: 'You have no dojos created' }, { status: 404 });
    }

    if (invitations.length === 0) {
      return NextResponse.json({ message: "You didn't send any invitations" }, { status: 404 });
    }

    if (dojos.length === 0 && invitations.length === 0) {
      return NextResponse.json(
        { message: "You have no dojos created and you didn't send any invitations" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.log('Error getting dojos and invitations', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
