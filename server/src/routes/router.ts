import { Router } from "express";
import { Request, Response } from "express";
import { registerUser } from "../controllers/authController";

const router = Router();
router.get("/register", (req: Request, res: Response) => {
  res.send("Register User Page");
});

router.post("/register", (req: Request, res: Response) => {
  console.log("Started user registartion");
  registerUser(req, res);
});

export default router;
