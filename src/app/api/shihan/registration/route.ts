import { hashPassword } from '@/lib/hashing';
import connectToDB from '@/configs/mongodb';
import { parseShihanForm } from '@/lib/shihan/parseShihanForm';
import { uploadImageToR2 } from '@/configs/uploadFileToR2';
import Shihan from '@/models/shihan/ShihanModel';
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/generateToken';

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const parsed = await parseShihanForm(formData);

    let idProofUrl;
    let teachingProofUrl;

    if (parsed.idProof) {
      idProofUrl = await uploadImageToR2(parsed.idProof.buffer, parsed.idProof.type);
    }
    if (parsed.teachingProof) {
      teachingProofUrl = await uploadImageToR2(
        parsed.teachingProof.buffer,
        parsed.teachingProof.type
      );
    }

    await connectToDB();

    const isAlreadyRegistered = await Shihan.findOne({
      $or: [{ email: parsed.email }, { phone: parsed.phone }],
    });

    if (isAlreadyRegistered) {
      return NextResponse.json(
        { status: 'Failed', message: 'You already registered in Coach Desk' },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(parsed.password);

    const newShihan = await Shihan.create({
      ...parsed,
      password: hashedPassword,
      idProof: idProofUrl,
      teachingProof: teachingProofUrl,
    });

    return NextResponse.json(
      {
        status: 'Success',
        message: 'You have successfully registered in Coach Desk',
        shihan: { newShihan, token: generateToken({ id: newShihan._id }) },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('Error while registering Shihan:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const shihan = await Shihan.find();
    if (shihan.length === 0) {
      return NextResponse.json(
        { status: 'Failed', message: 'No shihan registered' },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: 'Success', shihan }, { status: 200 });
  } catch (error: any) {
    console.log('Error while getting shihan', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
