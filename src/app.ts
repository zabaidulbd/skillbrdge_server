import cors from "cors";
import express, { Application } from "express";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000", // client side url
    credentials: true,
  }),
);

app.use(express.json());

// app.all("/api/auth/*splat", toNodeHandler(auth));

// app.use("/posts", postRouter);
// app.use("/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("Hello from skill bridge!");
});
// app.use(notFound);
// app.use(errorHandler);

export default app;
