import { NextFunction, Router } from "express";
import { Request, Response } from "express";

import {
  addProducts,
  getCart,
  //   removeProduct,
} from "../controllers/cartController";
import { authMiddleware } from "../middleware/authMiddleware";

const cartRouter = Router();

cartRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("MW runs");
    next();
  },
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Protected route accessed" });
  }
);

cartRouter.post("/cart/add", (req: Request, res: Response) => {
  addProducts(req, res);
});
// cartRouter.post("/cart/remove", (req: Request, res: Response) => {
//   removeProduct(req, res);
// });
cartRouter.get("/cart", (req: Request, res: Response) => {
  getCart(req, res);
});

export default cartRouter;
