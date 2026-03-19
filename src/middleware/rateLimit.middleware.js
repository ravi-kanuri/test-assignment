import RateLimit from "../user/rateLimit.model";
import ApiError from "../utils/ApiError";

const WINDOW_SIZE= 60*1000;
const MAX_REQUESTS=5;

const rateLimit = async (req , res ,next )=>{
    const userId= req.user?.id;
    if (!userId){
        throw new ApiError(400, "User Id is required")
    }
    const now= new Date();
    let record = await RateLimit.findByPk(userId);
    if(!record){
        await RateLimit.create({
            userId,
            count:1,
            windowStart: now,
        });
        return next();
    }

    const difference = now - record.windowStart;
    if(difference< WINDOW_SIZE){
        if(record.count>=MAX_REQUESTS){
            throw new ApiError(429, "Too many requests")
        }
         record.count+=1;
    await record.save();
    return next();
    }
   
   
     record.count=1;
    record.windowStart = now;
    await record.save();


}

export default rateLimit;