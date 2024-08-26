import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const socketConnection = io(backendUrl, {
      withCredentials: true,
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    setSocket(socketConnection);

    

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  

  return socket;
};
