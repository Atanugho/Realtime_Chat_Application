import AppError from "../utils/AppError.js";
import asyncHandeler from "../midlewares/asyncHandeler.middleware.js";
//import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const isLoggedIn = asyncHandeler(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("You are not logged in", 401));
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    req.user = decode;
    next();
    
});