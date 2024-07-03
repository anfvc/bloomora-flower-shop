import express from "express";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connection from "./libs/database.js";

await connection();

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

