import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import aiRouter from "./routes/aiRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

// Clerk
app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.send("server is Live!");
});

app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});