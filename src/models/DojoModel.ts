import mongoose from 'mongoose';
import '@/models/shihan/ShihanModel';

const DojoSchema = new mongoose.Schema(
  {
    dojoName: {
      type: String,
      required: [true, 'Dojo name is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    students : {type : [mongoose.Schema.Types.ObjectId], ref: 'Students'},
    schedule: [
      {
        day: {
          type: String,
          enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          required: [true, 'Day is required'],
        },
        time: {
          type: [String],
          required: true,
          validate: {
            validator: function (val: string[]) {
              return val.length > 0;
            },
            message: 'At least one time entry is required',
          },
        },
      },
    ],
    shihanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shihan',
      required: [true, 'Shihan ID is required'],
    },
  },
  { timestamps: true }
);

const Dojos = mongoose.models.Dojos || mongoose.model('Dojos', DojoSchema);
export default Dojos;
