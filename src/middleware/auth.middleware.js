import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

const auth =(req, res, next)=>{
    const token =req.cookies?.token;

    if(!token){
        throw new ApiError(401,"Unauthorized");
    }
    const decode= jwt.verify(token, process.env.JWT_KEY);
    req.user=decode;
    next();

}

export default auth;
