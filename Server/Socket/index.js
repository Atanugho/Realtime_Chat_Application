import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import http from "http";
import { getUserDetailsFromToken } from '../helper/getUserDetailsFromToken.js';
import User from "../models/user.model.js";
import { ConversationModel,MessageModel } from '../models/Conversation.model.js';


const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL], 
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const onlineUsers = new Set();

// function getOnlineUsers() {
//   return Array.from(onlineUsers.keys());
// }

io.on('connection', async(socket) => {
  console.log("connected user", socket.id);

  const token = socket.handshake.auth.token;

  const user = await getUserDetailsFromToken(token);

  socket.join(user?._id.toString());

  onlineUsers.add(user?._id?.toString());

  io.emit('onlineUsers', Array.from(onlineUsers))

  socket.on('message-page', async(userId) => {

    console.log("message-page", userId);

    const user = await User.findById(userId).select("-password");

    const payload = {
      _id : user?._id,
      name : user?.name,
      email : user?.email,
      profile_pic : user?.profile_pic,
      online : onlineUsers.has(user?._id?.toString())
    }
    
    socket.emit('message-user', payload);
    
  });

  socket.on('new-messgae', async(data) => {

     let checkConversation = await ConversationModel.findOne({
      "$or": [
        { sender : data?.sender , reciver : data?.reciver},
        { sender : data?.reciver , reciver : data?.sender}
      ]
    })

    if(!checkConversation){
      const createConversation = await ConversationModel({
        sender : data?.sender,
        reciver : data?.reciver
      })

      checkConversation = await createConversation.save()
    }

    const message = await MessageModel({
        text : data.text,
        imageUrl : data.imageUrl,
        videoUrl : data.videoUrl,
        messageBy : data?.messageBy
    })

    const saveMessage = await message.save()

    const updateConversation = await ConversationModel.updateOne({_id : checkConversation?._id }, {
      "$push":  { messages : saveMessage?._id}
    })

    const getConversation = await ConversationModel.findOne({
      $or: [
        { sender : data?.sender , reciver : data?.reciver},
        { sender : data?.reciver , reciver : data?.sender}
      ]
    }).populate('messages').sort({updatedAt : -1})

    io.to(data?.sender).emit('message',getConversation.messages)
    io.to(data?.reciver).emit('message',getConversation.messages)
  
  })



  socket.on('disconnect', () => {
    onlineUsers.delete(user?._id);
    console.log("disconnected user", socket.id);
  });
});

export {
  app,
  server
};
