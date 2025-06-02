import connectToDB from '@/configs/mongodb';
import { protectShihan } from '@/lib/jwt';
import Dojos from '@/models/DojoModel';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const authResult = await protectShihan(req);

  if (authResult.error) {
    return NextResponse.json(
      { status: 'Failed', message: authResult.error },
      { status: authResult.status }
    );
  }

  if (!authResult.shihan) {
    return NextResponse.json({ status: 'Failed', message: 'Shihan not found' }, { status: 404 });
  }
  const { id } = params;
  try {
    await connectToDB();
    const mydojos = await Dojos.find({ shihanId: id }).populate('shihanId');
    if (mydojos.length === 0)
      return new Response("You don't create any of your dojos on koach desk", { status: 404 });
    return NextResponse.json(
      { status: 'Success', message: 'You have successfully fetched your dojos', dojos: mydojos },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in fetching dojos', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
