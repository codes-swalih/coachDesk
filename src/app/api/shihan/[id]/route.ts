import connectToDB from '@/configs/mongodb';
import { parseShihanForm } from '@/lib/shihan/parseShihanForm';
import { uploadImageToR2 } from '@/configs/uploadFileToR2';
import Shihan from '@/models/shihan/ShihanModel';

import { NextResponse } from 'next/server';

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const formData = await req.formData();
    const parsedShihanUpdateData = await parseShihanForm(formData);

    let idProofUrl;
    let teachingProofUrl;

    if (parsedShihanUpdateData.idProof) {
      idProofUrl = await uploadImageToR2(
        parsedShihanUpdateData.idProof.buffer,
        parsedShihanUpdateData.idProof.type
      );
    }
    if (parsedShihanUpdateData.teachingProof) {
      teachingProofUrl = await uploadImageToR2(
        parsedShihanUpdateData.teachingProof.buffer,
        parsedShihanUpdateData.teachingProof.type
      );
    }

    await connectToDB();
    const updatedShihan = await Shihan.findByIdAndUpdate(id, parsedShihanUpdateData, {
      new: true,
    });
    if (!updatedShihan) {
      return NextResponse.json({ status: 'Failed', message: 'Shihan not found' }, { status: 404 });
    }
    return NextResponse.json(
      { status: 'Success', message: 'Shihan updated successfully', updatedShihan },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error while updating Shihan:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDB();
    const shihan = await Shihan.findById(id);
    if (!shihan) {
      return NextResponse.json({ status: 'Failed', message: 'Shihan not found' }, { status: 404 });
    }
    return NextResponse.json(
      { status: 'Success', message: 'Shihan found', shihan },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error while fetching Shihan:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connectToDB();
    const shihan = await Shihan.findByIdAndDelete(id);
    if (!shihan) {
      return NextResponse.json({ status: 'Failed', message: 'Shihan not found' }, { status: 404 });
    }
    return NextResponse.json(
      { status: 'Success', message: 'Shihan deleted successfully', shihan },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error while deleting Shihan:', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
