import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/router";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/auth", authRoute);

export default app;
