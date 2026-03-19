import express from "express";
import cookieParser from "cookie-parser"

import userRouter from "./src/user/user.route.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser);

app.use("/api/v1/user",userRouter);

export default app;