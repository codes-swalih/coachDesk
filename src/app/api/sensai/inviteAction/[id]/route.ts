import connectToDB from '@/configs/mongodb';
import { protectShihan } from '@/lib/jwt';
import InviteSensai from '@/models/shihan/InviteSensaiModel';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { status } = await req.json();
  try {
    await connectToDB();

    const invitationStatus = await InviteSensai.findByIdAndUpdate(id, { status }, { new: true });
    if (!invitationStatus)
      return NextResponse.json(
        { status: 'Failed', message: 'Invitation not found' },
        { status: 404 }
      );

    return NextResponse.json(
      { status: 'Success', message: 'Invitation status updated successfully', invitationStatus },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error updating invitation status', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
