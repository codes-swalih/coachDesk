import connectToDB from '@/configs/mongodb';
import Dojos from '@/models/DojoModel';
import { IDojo } from '@/types/classTypes';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body: IDojo = await req.json();
  const { dojoName, location, schedule, shihanId } = body;
  try {
    await connectToDB();
    const isAlreadyExist = await Dojos.findOne({ dojoName, location, shihanId });
    if (isAlreadyExist)
      return NextResponse.json({ message: 'Dojo already exist' }, { status: 400 });
    const newDojo = await Dojos.create({ dojoName, location, schedule, shihanId });
    return NextResponse.json(
      { status: 'Success', message: 'Dojo created successfully', newDojo },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('Error while creating dojo: ', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const dojos = await Dojos.find().populate('shihanId');
    if (dojos.length === 0)
      return NextResponse.json({ message: 'No dojos added' }, { status: 404 });
    return NextResponse.json(
      { status: 'Success', message: 'Dojos fetched successfully', dojos },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error while fetching dojos: ', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
