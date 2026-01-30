import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  }),
);

app.use(express.json());

// Register
app.post("/api/auth/register", async (req, res) => {
  return await toNodeHandler(auth)(req, res);
});

// Login
app.post("/api/auth/login", async (req, res) => {
  req.url = "/api/auth/sign-in";
  return await toNodeHandler(auth)(req, res);
});

// Me
app.get("/api/auth/me", async (req, res) => {
  req.url = "/api/auth/get-session";
  return await toNodeHandler(auth)(req, res);
});

app.all("/api/auth/*splat", toNodeHandler(auth));

// app.use("/posts", postRouter);
// app.use("/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("Hello from skill bridge!");
});
app.use(notFound);
app.use(errorHandler);

export default app;
