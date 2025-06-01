import connectToDB from '@/configs/mongodb';
import { parseSensaiForm } from '@/lib/sensai/parsingSensaiForm';
import { uploadImageToR2 } from '@/configs/uploadFileToR2';
import Sensai from '@/models/sensai/SensaiModel';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const formData = await req.formData();
    const parsedSensaiUpdateData = await parseSensaiForm(formData);

    let profilePhotoUrl;
    let idProofUrl;

    if (parsedSensaiUpdateData.profilePhoto) {
      profilePhotoUrl = await uploadImageToR2(
        parsedSensaiUpdateData.profilePhoto.buffer,
        parsedSensaiUpdateData.profilePhoto.type
      );
    }

    if (parsedSensaiUpdateData.idProof) {
      idProofUrl = await uploadImageToR2(
        parsedSensaiUpdateData.idProof.buffer,
        parsedSensaiUpdateData.idProof.type
      );
    }

    await connectToDB();
    const updatedSensai = await Sensai.findByIdAndUpdate(
      id,
      {
        ...parsedSensaiUpdateData,
        ...(profilePhotoUrl && { profilePhoto: profilePhotoUrl }),
        ...(idProofUrl && { idProof: idProofUrl }),
      },
      { new: true }
    );

    if (!updatedSensai) {
      return NextResponse.json({ status: 'Failed', message: 'Sensai not found' }, { status: 404 });
    }

    return NextResponse.json(
      { status: 'Success', message: 'Sensai updated successfully', updatedSensai },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error while updating Sensai:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDB();
    const sensai = await Sensai.findById(id);
    if (!sensai) {
      return NextResponse.json({ status: 'Failed', message: 'Sensai not found' }, { status: 404 });
    }
    return NextResponse.json(
      { status: 'Success', message: 'Sensai found', sensai },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error while fetching Sensai:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDB();
    const sensai = await Sensai.findByIdAndDelete(id);
    if (!sensai) {
      return NextResponse.json({ status: 'Failed', message: 'Sensai not found' }, { status: 404 });
    }
    return NextResponse.json(
      { status: 'Success', message: 'Sensai deleted successfully', sensai },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error while deleting Sensai:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
