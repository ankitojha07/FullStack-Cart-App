import mongoose, { Document, Schema } from "mongoose";

interface CartItem {
  productId?: mongoose.Schema.Types.ObjectId; // Make this optional
  itemNumber: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  otp?: string;
  otpExpiry?: Date;
  isVerified: Boolean;
  cart: CartItem[];
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
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: false,
        }, // Make it optional if not using it
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        itemNumber: { type: String, required: true, unique: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<Iuser>("User", userSchema);
export default User;
