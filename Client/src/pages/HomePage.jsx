import  Sidebar  from "../components/Sidebar"
import { Outlet, useLocation } from "react-router-dom"
import logo from "../assets/chatapp_logo.jpeg";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOnlineUsers } from "@/Redux/Slices/OnlineUserSlice"; 
import { useSocket } from "../Hooks/Socket.js";


function HomePage() {

  const location = useLocation();
  const dispatch = useDispatch();
  
  const basePath = location.pathname === '/' 

  const socket = useSocket();

  // console.log('Socket Connection: ', socketConnection);
  //   socketConnection.on('connect', () => {
  //     console.log('Socket connected');
  //   });
  
  //   socketConnection.on('onlineUsers', (data) => {
  //     dispatch(setOnlineUsers(data));
  //   });


    useEffect(() => {
      if (socket) {
        socket.on('onlineUsers', (data) => {
          dispatch(setOnlineUsers(data));
        });
  
        return () => {
          socket.off('onlineUsers'); 
        };
      }
    }, [socket, dispatch]);
  
  
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
          <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div className={`flex justify-center items-center flex-col gap-2 ${!basePath ? "hidden" :"lg-flex"}`}>
        <div className='flex justify-center items-center'>
            <img 

                src={logo}
                alt='ChatApp_Logo'
                height={80}
                width={60}
            />
            <p className='text-5xl text-bold ml-2' >HeartBeat</p>    
        </div>
        <p className="text-lg mt-2 text-slate-500"> Select user to send message</p>

      </div>
    </div>
  )
}

export default HomePage;