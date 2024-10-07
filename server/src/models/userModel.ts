import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  otp: string;
  otpExpiry: Date;
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
