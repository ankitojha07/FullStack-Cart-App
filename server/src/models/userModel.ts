import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  otp?: string;
  otpExpiry?: Date;
  isVerified: Boolean;
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    otp: {
      required: true,
      type: String,
    },
    otpExpiry: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model<Iuser>("User", userSchema);
export default user;
