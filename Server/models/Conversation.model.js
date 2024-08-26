import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    text:{
        type:String,
        default:"",
    },
    imageUrl:{
        type:String,
        default:"",
    },
    videoUrl:{
        type:String,
        default:"",
    },
    IsSeen:{
        type:Boolean,
        default:false,
    },
    messageBy : {
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    }   
},{timestamps:true});

const conversationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    reciver:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    messages:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Message'
        }
    ]
},{timestamps:true});

const MessageModel = mongoose.model('Message',messagesSchema);
const ConversationModel = mongoose.model('Conversation',conversationSchema); 

export {
    ConversationModel,
    MessageModel
}