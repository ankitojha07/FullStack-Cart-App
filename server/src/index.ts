import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/router";
import cartRouter from "./routes/cartRouter";
import { authMiddleware } from "./middleware/authMiddleware";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    // Frontend URL
    // for localhost
    // origin: "http://localhost:3000",

    // for live
    origin: "https://cart-app-frontend.vercel.app/",

    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Allow cookies (only if needed)
  })
);

app.options(
  "*",
  cors({
    // Frontend URL
    // for localhost
    // origin: "http://localhost:3000",

    // for live
    origin: "https://cart-app-frontend.vercel.app/",

    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Allow cookies (only if needed)
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/auth", authRoute);
app.use("/protected", authMiddleware, cartRouter);

export default app;
