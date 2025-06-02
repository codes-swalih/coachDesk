import mongoose from 'mongoose';

const InviteSensaiSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    dojos: {
      type: [mongoose.Schema.Types.ObjectId],
      required: [true, 'Dojos are required'],
      ref: 'Dojos',
    },
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
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    message: { type: String, required: [true, 'Message is required'] },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    shihanId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Shihan ID is required'],
      ref: 'Shihan',
      index: true,
    },
    sensaiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sensai',
      index: true,
    },
  },
  { timestamps: true }
);

const InviteSensai =
  mongoose.models.InviteSensai || mongoose.model('InviteSensai', InviteSensaiSchema);
export default InviteSensai;
