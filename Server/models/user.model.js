import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    profile_pic: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
    },
},{
    timestamps:true
});




const user = mongoose.model('User',userSchema);

export default user;

