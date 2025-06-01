import { NextResponse } from 'next/server';
import { comparePassword } from '@/lib/hashing';
import connectToDB from '@/configs/mongodb';
import Shihan from '@/models/shihan/ShihanModel';
import  {generateToken}  from '@/lib/generateToken';

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

    const shihan = await Shihan.findOne({ email: email.toLowerCase() });

    if (!shihan) {
      return NextResponse.json(
        { status: 'Failed', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = comparePassword(password, shihan.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { status: 'Failed', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Remove sensitive data before sending response
    const shihanData = shihan.toObject();
    delete shihanData.password;

    return NextResponse.json(
      {
        status: 'Success',
        message: 'Login successful',
        shihan: {shihanData, token: generateToken({ id: shihanData._id })},
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.log('Error in shihan login:', error);
    return NextResponse.json(
      { status: 'Failed', message: error.message },
      { status: 500 }
    );
  }
};