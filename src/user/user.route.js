import express from "express";
import auth from "../middleware/auth.middleware";
import rateLimit from "../middleware/rateLimit.middleware";
import asyncHandler from "../middleware/asyncHandler";
import { getUser, register } from "./user.constroller";

const router = express.Router();

router.post("/signin",register);
router.get("/getUser",auth, rateLimit,getUser)

export default router;