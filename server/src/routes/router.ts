import { Router } from "express";
import { Request, Response } from "express";
import {
  registerUser,
  resendOtp,
  userLogin,
  verifyEmailOtp,
} from "../controllers/authController";

const router = Router();
router.get("/register", (req: Request, res: Response) => {
  res.send("Register User Page");
});
router.get("/login", (req: Request, res: Response) => {
  res.send("user Login Page");
});

router.post("/register", (req: Request, res: Response) => {
  registerUser(req, res);
});
router.post("/verifyotp", (req: Request, res: Response) => {
  verifyEmailOtp(req, res);
});

router.post("/resend-otp", (req: Request, res: Response) => {
  resendOtp(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  userLogin(req, res);
});
export default router;
