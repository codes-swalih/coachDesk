import { NextResponse } from 'next/server';
import { comparePassword } from '@/lib/hashing';
import connectToDB from '@/configs/mongodb';
import { generateToken } from '@/lib/generateToken';
import Sensai from '@/models/sensai/SensaiModel';

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { status: 'Failed', message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectToDB();

    const sensai = await Sensai.findOne({ email: email.toLowerCase() });

    if (!sensai) {
      return NextResponse.json(
        { status: 'Failed', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = comparePassword(password, sensai.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { status: 'Failed', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Remove sensitive data before sending response
    const sensaiData = sensai.toObject();
    delete sensaiData.password;

    return NextResponse.json(
      {
        status: 'Success',
        message: 'Login successful',
        shihan: { sensaiData, token: generateToken({ id: sensaiData._id }) },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error in sensai login:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
