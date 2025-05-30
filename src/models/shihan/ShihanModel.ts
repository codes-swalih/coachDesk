import mongoose from 'mongoose';

const shihanSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    place: {
      type: String,
      required: [true, 'Place is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    pinCode: {
      type: String,
      required: [true, 'PIN code is required'],
      match: [/^\d{6}$/, 'Please enter a valid 6-digit PIN code'],
    },
    idProof: {
      type: String,
      required: [true, 'ID proof is required'],
    },
    clubName: {
      type: String,
      required: [true, 'Club name is required'],
      trim: true,
    },
    isAssociationMember: {
      type: Boolean,
      default: false,
    },
    associationName: {
      type: String,
      required: function () {
        return this.isAssociationMember === true;
      },
      trim: true,
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      trim: true,
    },
    teachingProof: {
      type: String,
      required: [true, 'Teaching proof is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    yearsExperience: {
      type: Number,
      required: [true, 'Years of experience is required'],
      min: [0, 'Years of experience cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

shihanSchema.pre('save', function (next) {
  next();
});

const Shihan = mongoose.models.Shihan || mongoose.model('Shihan', shihanSchema);

export default Shihan;
