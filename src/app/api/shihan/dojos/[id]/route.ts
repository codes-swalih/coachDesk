import connectToDB from '@/configs/mongodb';
import { protectShihan } from '@/lib/jwt';
import Dojos from '@/models/DojoModel';
import { IDojo } from '@/types/classTypes';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
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
  const body: IDojo = await req.json();
  try {
    await connectToDB();
    const updatedDojo = await Dojos.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(
      { status: 'Success', message: 'You succesfully edited a Dojo Details', updatedDojo },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in updating a Dojo Details', error);
    return NextResponse.json(
      { status: 'Error', message: 'Error in updating a Dojo Details', error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
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
    await Dojos.findByIdAndDelete(id);
    return NextResponse.json(
      { status: 'Success', message: 'You succesfully deleted a Dojo Details' },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in deleting a Dojo Details', error);
    return NextResponse.json(
      { status: 'Error', message: 'Error in deleting a Dojo Details', error: error.message },
      { status: 500 }
    );
  }
};

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
    const dojo = await Dojos.findById(id).populate('shihanId');
    return NextResponse.json(
      { status: 'Success', message: 'You succesfully fetched a Dojo Details', dojo },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in fetching a Dojo Details', error);
    return NextResponse.json(
      { status: 'Error', message: 'Error in fetching a Dojo Details', error: error.message },
      { status: 500 }
    );
  }
};
