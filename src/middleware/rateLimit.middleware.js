import RateLimit from "../models/rateLimit.model.js";
import ApiError from "../utils/ApiError.js";

const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 5;

const rateLimit = async (req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const now = new Date();

  let record = await RateLimit.findByPk(ip);

  if (!record) {
    await RateLimit.create({
      ip,
      count: 1,
      windowStart: now,
    });
    return next();
  }

  const diff = now - record.windowStart;

  if (diff < WINDOW_SIZE) {
    if (record.count >= MAX_REQUESTS) {
      throw new ApiError(429, "Too many requests");
    }

    record.count += 1;
    await record.save();
    return next();
  }

  record.count = 1;
  record.windowStart = now;
  await record.save();

  next();
};

export default rateLimit;