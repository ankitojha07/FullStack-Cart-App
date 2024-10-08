import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "../utils/sendEmail";
import { generateOtp } from "../utils/generateOtp";
import User, { Iuser } from "../models/userModel";

// below is the code for registering the user with name, email, pass
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Can not create duplicate user!" });
    }

    async function hashPassword(myPlaintextPassword: string) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(myPlaintextPassword, salt);
      return hash;
    }

    const { otp, otpExpiry } = generateOtp();
    const isOtpSent = await sendOtpEmail(email, otp);

    if (!isOtpSent) {
      return res.status(500).json({
        message: "Failed to send OTP. User not registered.",
      });
    }

    const user = User.create({
      name,
      email,
      password: await hashPassword(password),
      otp,
      otpExpiry,
    });
    (await user).save;
    res.status(200).json({ message: "OTP sent to email." });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(400).json({ message: "Server error" });
  }
};

// verify email using otp
export const verifyEmailOtp = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const user = await User.findOne({
      otp,
    });
    if (!user) {
      return res.status(400).json({ message: "invalid or expired otp " });
    }
    if (!user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired." });
    }
    const isOtpExpired =
      (user.otpExpiry ? user.otpExpiry.getTime() : 0) < Date.now();
    if (isOtpExpired) {
      return res.status(400).json({ message: "OTP has expired." });
    }
    user.otp = "0";
    user.otpExpiry = undefined;
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Otp verified successfuly" });
  } catch (error) {
    console.error("Verification failed", error);
    res.status(400).json({ message: "Server error" });
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ message: "Email not found pls register yourself!" });
    }
    const existingUser = user as Iuser;
    if (existingUser.isVerified) {
      res.status(400).json("User already verified");
    }
    const { otp, otpExpiry } = generateOtp();

    const isOtpSent = sendOtpEmail(email, otp);

    if (!isOtpSent) {
      res.status(400).json("Something went wrong!");
    }

    existingUser.otp = otp;
    existingUser.otpExpiry = otpExpiry;
    existingUser.save();

    res.status(200).json("Resent OTP on your mail");
  } catch (error) {
    console.error("Error registering user", error);
    res.status(400).json({ message: "Server error" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = (await User.findOne({ email })) as Iuser;
    if (!user) {
      res.status(400).json({ message: "Email or Password is incorrect." });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        console.log(password);
        console.log(user.password);

        res.status(200).json({ message: "User can login" });
      } else {
        console.error(err);
        res.status(400).json({ message: "Username or Password is incorrect!" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "An error occured!" });
  }
};
