import asyncHandeler from "../midlewares/asyncHandeler.middleware.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import  bcryptjs  from 'bcryptjs';
import { getUserDetailsFromToken } from "../helper/getUserDetailsFromToken.js";


const cookieOptions = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    httpOnly: true,
};


export const registerUser = asyncHandeler(async (req, res,next) => {

    const { name,email,password } = req.body;

    const checkEmail = await User.findOne({email});

    if(checkEmail){
        return next(new AppError('User with given email already exists', 400));
    }

    if (!email || !password || !name ) {
        return next(new AppError('All fields are required', 400));
    }

    const salt = await bcryptjs.genSalt(12);


    const hashedPassword = await bcryptjs.hash(password,salt);


    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        profile_pic:{
            public_id: email,
            secure_url:
              'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        },
    });

    if (req.file) {
        try {
          const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'Chat_App',
            width: 250,
            height: 250,
            gravity: 'faces', 
            crop: 'fill',
          });
    
          if (result) {
            user.profile_pic.public_id = result.public_id;
            user.profile_pic.secure_url = result.secure_url;
    
            // After successful upload remove the file from local storage
            await fs.rm(`uploads/${req.file.filename}`);
          }
        } catch (error) {
          return next(
            new AppError(error || 'File not uploaded, please try again', 400)
          );
        }
      }

    const userSave = await user.save();

    user.password = undefined;
    
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: userSave,
    });
});

export const loginUser = asyncHandeler(async (req, res,next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new AppError("User with given email not found", 400));
    }


    const checkPassword = await bcryptjs.compare(password,user.password);


    if(!checkPassword){
        return next(new AppError("Password does not match", 400));
    }

    const token = jwt.sign({ id: user._id,email:user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
    
    res.cookie('token', token, cookieOptions);

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'User login successfully',
        data:user, 
        token:token
    });
});

export const userDetails = asyncHandeler(async (req, res,next) => {
    const token = req.cookies.token || ""

    const user = await getUserDetailsFromToken(token);

    return res.status(200).json({
        message: 'User details fetched successfully',
        success: true,
        data: user,
    });
});

export const logoutUser = asyncHandeler(async (req, res,next) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true,
    });

    return res.status(200).json({
        message: 'User logout successfully',
        success: true,
    });
});

export const updateUserDetails = asyncHandeler(async (req, res,next) => {
    const token = req.cookies.token || ""

    const user = await getUserDetailsFromToken(token);
    
    const { name,profile_pic } = req.body;

    if (!name || !profile_pic) {
        return next(new AppError('All fields are required', 400));
    }

    const updateUser = await User.updateOne({_id:user._id},{
        name,
        profile_pic
    });

    const userInformation = await User.findById(user._id);

    return res.status(200).json({
        message: 'User details updated successfully',
        success: true,
        data: userInformation,
    });
});

export const searchUser = asyncHandeler(async(req,res,next) => {
    const { search } = req.body;

    const query = new RegExp(search, "i","g")

    const user = await User.find({
        "$or":[
            {name : query},
            {email : query}
        ]
    }).select("-password")

    return res.status(200).json({
        message: 'Fetch all user',
        success: true,
        data: user,
    }); 
});
    