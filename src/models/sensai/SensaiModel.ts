import mongoose from 'mongoose';

const SensaiSchema = new mongoose.Schema(
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
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    placeCity: {
      type: String,
      required: [true, 'Place/City is required'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    profilePhoto: {
      type: String,
      required: [true, 'Profile photo is required'],
    },
    idProof: {
      type: String,
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      trim: true,
    },
    trainingExperience: {
      type: Number,
      required: [true, 'Training experience is required'],
      min: [0, 'Training experience cannot be negative'],
    },
    isCertifiedToTeach: {
      type: Boolean,
      default: false,
    },
    dojos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Dojos',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

SensaiSchema.index({ email: 1 });

const Sensai = mongoose.models.Sensai || mongoose.model('Sensai', SensaiSchema);

export default Sensai;
