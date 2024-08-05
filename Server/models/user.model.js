import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    avatar: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
    },
    profileSetup:{
        type:Boolean,
        default:false,
    },
},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();
});


const user = mongoose.model('User',userSchema);

export default user;

