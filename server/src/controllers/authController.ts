import { Express, Request, Response } from "express";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "../utils/sendEmail";
import { generateOtp } from "../utils/generateOtp";
import User from "../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Can not create duplicate user!" });
    }
    // const hashedPassword = (input: string) => {
    //   bcrypt.genSalt(10, function (err, salt) {
    //     bcrypt.hash(input, salt, function (err, hash) {

    //     });
    //   });
    // };

    async function hashPassword(myPlaintextPassword: string) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(myPlaintextPassword, salt);
      return hash;
    }

    const { otp, otpExpiry } = generateOtp();

    const user = User.create({
      name,
      email,
      password: await hashPassword(password),
      otp,
      otpExpiry,
    });
    await sendOtpEmail((await user).email, otp);
    res
      .status(200)
      .json({ message: "User registered successfully. OTP sent to email." });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(400).json({ message: "Server error" });
  }
};
