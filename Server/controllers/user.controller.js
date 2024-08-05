import asyncHandeler from "../midlewares/asyncHandeler.middleware.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email,userId) => {
    return jwt.sign({email,userId},process.env.JWT_SECRET,{expiresIn:maxAge});
}

export const signup = asyncHandeler(async (req, res,next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError('Email already exists', 409));
    }

    const user = await User.create({email,password});

    res.cookie('jwt',createToken(email,user._id),{
        maxAge,
        secure:true,
        httpOnly:true,
        sameSite: 'None',
    });
    
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
    });
});