import { useEffect, useState } from "react";
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

  const [loding,setLoding] = useState(false);
  const [allMessage,setAllMessage] = useState([])


  function handleDocumet(){
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
  }, [socket, params?.userId, userDetails]);

  

  return (
    <div className='bg-no-repeat bg-cover min-h-screen flex flex-col' style={{ backgroundImage: `url(${background})` }}>
      <header className='sticky top-0 h-16 bg-slate-400 flex justify-between items-center'>
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
          <FcVideoCall
            className="cursor-pointer hover:bg-blue-500 rounded-full"
            size={35}
          />
        </div>
      </header>

      <section className="flex-grow overflow-x-hidden overflow-y-scroll scrollbar relative">
        
            
                  {
                      message.imageUrl && (
                        <div className='h-full w-full flex justify-center items-center rounded overflow-hidden'>
                          <div className='w-fit p-2 absolute top-0 text-white right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadImage} >
                              <IoClose size={30}/>
                          </div>
                          <div className='bg-red-white p-3'>
                              <img
                                src={message.imageUrl}
                                alt='uploadImage'
                                className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                              />
                          </div>
                        </div>
                      )
                  }

                  {
                      message.videoUrl && (
                        <div className='h-full w-full flex justify-center items-center rounded overflow-hidden'>
                          <div className='w-fit p-2 absolute top-0 text-white right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadVideo} >
                              <IoClose size={30}/>
                          </div>
                          <div >
                              <video 
                                  src={message.videoUrl} 
                                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                                  controls
                                  muted
                                  autoPlay
                                />
                          </div>
                        </div>
                      )
                  }

                  {
                     loding && (
                      <div className='flex justify-center items-center'>
                                <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white'></div>
                      </div>

                     )
                  }

                  <div className="flex flex-col gap-2 my-3 mx-3">
                    {
                      allMessage.map((msg,index) => {
                        return(
                          <div className="bg-white p-1 py-1 rounded w-fit">
                            <p className="px-2 text-black lg:text-xl">{msg.text}</p>
                            <p className="text-xs ml-auto w-fit text-red-600">{moment(msg.createdAt).format('hh:mm')}</p>
                          </div>
                        )
                      })
                    }
                  </div>

            
      </section>

    
      <section className="h-16 bg-slate-400 flex items-center px-4">

            <div className="flex justify-center items-center w-12 h-12 rounded-lg hover:bg-blue-500 hover:text-white">
                <button>
                  <BsEmojiHeartEyes 
                  size={25}
                  />
                </button>
            </div>
            <div className="relative">
              <button onClick={handleDocumet} className="flex justify-center items-center w-12 h-12 rounded-lg hover:bg-blue-500 hover:text-white">
                <IoMdAttach 
                size={30}
                />
              </button>

              {
                openDocument && (
                  <div className="bg-white shadow rounded absolute bottom-16 w-36 p-2">
                  <form>
                    <label htmlFor="upload-image" className="flex items-center p-2 gap-3 hover:bg-red-100 cursor-pointer">
                      <div className="text-blue-600 ">
                        <IoMdPhotos 
                        size={20}
                        />
                      </div>
                      <p>Image</p>
                    </label>
                    <label htmlFor="upload-video" className="flex items-center p-2 gap-3 hover:bg-red-100 cursor-pointer">
                      <div className="text-blue-600">
                        <FaVideo 
                        size={20}
                        />
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
                )
              }              
            </div>

            <form className="w-full h-full flex gap-2" onSubmit={handleSendMessage}>              
                 <input 
                  type="text"
                  placeholder="Write Your Message here....."
                  className="py-1 px-4 outline-none w-full h-full"
                  value={message.text}
                  onChange={handleOnChange}
                  />
                  <button className=" hover:text-blue-600">
                      <GrSend 
                      size={30}
                      />
                  </button>
            </form>
            
      </section>
    </div>
  );
}

export default MessagePage;
