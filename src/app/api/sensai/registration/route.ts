import { hashPassword } from '@/lib/hashing';
import connectToDB from '@/configs/mongodb';
import { parseSensaiForm } from '@/lib/sensai/parsingSensaiForm';
import { uploadImageToR2 } from '@/configs/uploadFileToR2';
import Sensai from '@/models/sensai/SensaiModel';
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/generateToken';

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const parsed = await parseSensaiForm(formData);

    let profilePhotoUrl;
    let idProofUrl;

    if (parsed.profilePhoto) {
      profilePhotoUrl = await uploadImageToR2(parsed.profilePhoto.buffer, parsed.profilePhoto.type);
    }

    if (parsed.idProof) {
      idProofUrl = await uploadImageToR2(parsed.idProof.buffer, parsed.idProof.type);
    }

    await connectToDB();

    const isAlreadyRegistered = await Sensai.findOne({
      $or: [{ email: parsed.email }, { phoneNumber: parsed.phoneNumber }],
    });

    if (isAlreadyRegistered) {
      return NextResponse.json(
        { status: 'Failed', message: 'You are already registered in Coach Desk' },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(parsed.password);

    const newSensai = await Sensai.create({
      ...parsed,
      password: hashedPassword,
      profilePhoto: profilePhotoUrl,
      idProof: idProofUrl,
    });

    return NextResponse.json(
      {
        status: 'Success',
        message: 'You have successfully registered in Coach Desk',
        sensai: newSensai,
        token: generateToken({ id: newSensai._id }),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('Error while registering Sensai:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const sensai = await Sensai.find();
    if (sensai.length === 0) {
      return NextResponse.json(
        { status: 'Failed', message: 'No sensai registered' },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: 'Success', sensai }, { status: 200 });
  } catch (error: any) {
    console.log('Error while getting sensai', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
