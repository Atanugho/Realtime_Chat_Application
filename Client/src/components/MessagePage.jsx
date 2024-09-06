import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../assets/background.webp";
import { useSocket } from "../Hooks/Socket.js";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FcVideoCall } from "react-icons/fc";
import { IoMdAttach } from "react-icons/io";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import uploadFile from "../helper/fileUpload.js";
import {IoClose} from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import moment from "moment";



function MessagePage() {
  const params = useParams();
  const userDetails = useSelector(state => state?.auth);
  const socket = useSocket();

  // console.log(userDetails)
  //console.log(socket);

  const [user, setUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  const [openDocument,setOpenDocument] = useState(false);
  const [message,setMessage] = useState({
    text : "",
    imageUrl : "",
    videoUrl : ""
  })


  const [loading,setLoding] = useState(false);
  const [allMessages,setAllMessage] = useState([])

  const currMessage = useRef(null)

  useEffect(() => {
    if(currMessage.current){
      currMessage.current.scrollIntoView({behavior : 'smooth',block:'end'})
    }
  },[allMessages])


  function handleDocument(){
    setOpenDocument(prev => !prev)
  }

  const handleUploadImage = async(e)=>{
    const file = e.target.files[0]

    setLoding(true);
    const uploadPhoto = await uploadFile(file);
    setLoding(false);
    setOpenDocument(false)

    setMessage(preve => {
      return{
        ...preve,
        imageUrl : uploadPhoto.url
      }
    })
  }

  const handleClearUploadImage = () => {
    setMessage(preve => {
      return{
        ...preve,
        imageUrl :""
      }
    })
  }

  const handleUploadVideo = async(e)=>{
    const file = e.target.files[0]

    setLoding(true);
    const uploadVideo = await uploadFile(file)
    setLoding(false);
    setOpenDocument(false)

    setMessage(preve => {
      return{
        ...preve,
        videoUrl : uploadVideo.url
      }
    })
  }

  const handleClearUploadVideo = () => {
    setMessage(preve => {
      return{
        ...preve,
        videoUrl : ""
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault();

   if( message.text || message.imageUrl || message.videoUrl) {
      if(socket) {
        if(socket.connected){
          socket.emit('new-messgae',{
            sender : userDetails.data._id,
            reciver : params.userId,
            text : message.text,
            imageUrl : message.imageUrl,
            videoUrl : message.videoUrl,
            messageBy : userDetails?.data?._id
          })

          setMessage(
            {
              text : "",
              imageUrl : "",
              videoUrl : ""
            }
          )
        }
      }
   }
  }

  const handleOnChange = (e) => {
    const { name,value } = e.target

    setMessage(prev => {
      return {
        ...prev,
        text : value
      }
    })
  }

  
  useEffect(() => {
    if (socket && params.userId) {
      if (socket.connected) {
        socket.emit('message-page', params.userId);

        socket.on('message-user', (data) => {
          setUser(data);
        })

        socket.on('message', (data) => {
          console.log('message-data',data);
          setAllMessage(data)
        })
      }

      socket.on('connect', () => {
        socket.emit('message-page', params.userId);
      });

      return () => {
        socket.off('connect');
      };
    }
  }, [socket, params?.userId, userDetails.data._id]);

  

  return (
    <div className="bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})` }}>
      <header className="sticky top-0 h-16 bg-slate-400 flex justify-between items-center">
        <div className="flex items-center gap-3 px-6">
          <div className="w-12 h-12 flex justify-center items-center cursor-pointer text-white hover:bg-blue-500 overflow-hidden rounded-full ">
            {user?.profile_pic?.secure_url ? (
              <img
                src={user?.profile_pic?.secure_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={35} />
            )}
          </div>
          <div>
            <p className="font-bold text-2xl text-black">{user?.name}</p>
            <p className="font-bold text-sm ">
              {user.online ? <span className="text-sky-600">Online</span> : <span className="text-pink-600">Offline</span>}
            </p>
          </div>
        </div>
        <div className="bg-white mr-16 rounded-full">
          <FcVideoCall className="cursor-pointer hover:bg-blue-500 rounded-full" size={35} />
        </div>
      </header>

      <section className="h-[calc(100vh-128px)] overflow-y-scroll scrollbar overflow-x-hidden relative">
        <div className="flex flex-col gap-2 mx-2 py-2" ref={currMessage}>
          {allMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-1 py-1 rounded-lg w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                userDetails.data?._id === msg.messageBy
                  ? "ml-auto px-5 bg-green-700 rounded-lg w-fit"
                  : "bg-white"
              }`}
              >

              <div className="w-full">
                {
                  msg?.imageUrl && (
                    <img
                    src={msg?.imageUrl}
                    className="w-full h-full object-scale-down"
                    />
                  )
                }
              </div>

              <div className="w-full">
                {
                  msg?.videoUrl && (
                    <video
                    src={msg?.videoUrl}
                    className="w-full h-full object-scale-down"
                    controls
                    />
                  )
                }
              </div>
              
            
              <p className="px-2 text-black lg:text-xl">{msg.text}</p>
              <p className="text-xs ml-auto w-fit text-black">{moment(msg.createdAt).format("hh:mm")}</p>
            </div>
          ))}
        </div>

        {loading && (
          <div className=" sticky bottom-0 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {message.imageUrl && (
          <div className="h-full w-full sticky bottom-0 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 text-white right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadImage}
            >
              <IoClose size={30} />
            </div>
            <div className="bg-red-white p-3">
              <img
                src={message.imageUrl}
                alt="uploadImage"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}

        {message.videoUrl && (
          <div className="h-full w-full sticky bottom-0 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 text-white right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadVideo}
            >
              <IoClose size={30} />
            </div>
            <div>
              <video
                src={message.videoUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}
      </section>

      <section className="h-16 bg-slate-400 flex items-center px-4">
        <div className="flex justify-center items-center w-12 h-12 rounded-lg hover:bg-blue-500 hover:text-white">
          <button>
            <BsEmojiHeartEyes size={25} />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={handleDocument}
            className="flex justify-center items-center w-12 h-12 rounded-lg hover:bg-blue-500 hover:text-white"
          >
            <IoMdAttach size={30} />
          </button>

          {openDocument && (
            <div className="bg-white shadow rounded absolute bottom-16 w-36 p-2">
              <form>
                <label
                  htmlFor="upload-image"
                  className="flex items-center p-2 gap-3 hover:bg-red-100 cursor-pointer"
                >
                  <div className="text-blue-600">
                    <IoMdPhotos size={20} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="upload-video"
                  className="flex items-center p-2 gap-3 hover:bg-red-100 cursor-pointer"
                >
                  <div className="text-blue-600">
                    <FaVideo size={20} />
                  </div>
                  <p>Video</p>
                </label>

                <input
                  type="file"
                  id="upload-image"
                  onChange={handleUploadImage}
                  className="hidden"
                />
                <input
                  type="file"
                  id="upload-video"
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>

        <form
          className="flex-grow flex items-center"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            className="w-full px-4 h-12 outline-none rounded-xl"
            placeholder="Enter your message ...."
            value={message.text}
            onChange={handleOnChange}
          />
        </form>

        <button
          className="flex justify-center items-center w-12 h-12 rounded-lg  hover:text-blue-600"
          onClick={handleSendMessage}
        >
          <GrSend size={30} />
        </button>
      </section>
    </div>
  );
}

export default MessagePage;