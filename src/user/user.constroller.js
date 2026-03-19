import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

export const register = async ( req, res )=>{
    const {email ,password} = req.body;
    if(!email||!password){
        throw new ApiError(400, "All fields are required")
    }
    const exist = await User.findOne({where :{email}});
    if(exist){
        throw new ApiError(400, "User exist")
    }
    const hashed =await bcrypt.hash(password, 10);
    const user = await User.create({
        email: email,
        password: hashed
    })
    const token =jwt.sign({id:user.id},process.env.JWT_KEY);
    res.cookies("token",token,{
        httpOnly: true,
    })
    res.status(201).json(user)
}

export const getUser =async( req, res)=>{
    const userId= req.user.id;
     const userDetails = await User.findByPk(userId);
    if(userDetails){
        throw new ApiError(400, "User does not exist")
    }
    res.status(200).json(userDetails);
}

