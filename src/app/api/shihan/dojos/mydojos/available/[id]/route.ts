import connectToDB from '@/configs/mongodb';
import { protectShihan } from '@/lib/jwt';
import Dojos from '@/models/DojoModel';
import InviteSensai from '@/models/shihan/InviteSensaiModel';
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
    const dojos = await Dojos.find({ shihanId: id }).populate('shihanId');
    const invitations = await InviteSensai.find({
      shihanId: id,
      status: 'accepted',
    })
      .populate('shihanId')
      .populate('dojos');

    if (dojos.length === 0) {
      return NextResponse.json({ message: 'You have no dojos created' }, { status: 404 });
    }

    // Process each dojo to filter out occupied slots
    const availableDojos = dojos.map((dojo) => {
      const dojoObj = dojo.toObject();

      // Filter schedule for each dojo
      dojoObj.schedule = dojoObj.schedule.reduce((acc: any[], daySchedule: any) => {
        // Get all accepted invitations for this dojo
        const dojoInvitations = invitations.filter((inv) =>
          inv.dojos.some((d: any) => d._id.toString() === dojoObj._id.toString())
        );

        // Get all occupied times for this day
        const occupiedTimes = new Set();
        dojoInvitations.forEach((inv) => {
          const dayInv = inv.schedule.find((s: any) => s.day === daySchedule.day);
          if (dayInv) {
            dayInv.time.forEach((t: string) => occupiedTimes.add(t));
          }
        });

        // Filter out occupied times
        const availableTimes = daySchedule.time.filter((time: string) => !occupiedTimes.has(time));

        // Only include days that have available times
        if (availableTimes.length > 0) {
          acc.push({
            ...daySchedule,
            time: availableTimes,
          });
        }

        return acc;
      }, []);

      return dojoObj;
    });

    return NextResponse.json(
      {
        status: 'Success',
        message: 'You have successfully fetched all available classes to assign',
        dojos: availableDojos,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log('Error getting dojos and invitations', error);
    return NextResponse.json({ status: 'Failed', message: error.message }, { status: 500 });
  }
};
