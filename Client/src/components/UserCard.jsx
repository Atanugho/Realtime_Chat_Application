import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



function UserCard({ user,onClose }) {

  const activeUser = useSelector(state => state?.onlineUsers?.onlineUsers)
  
  const isOnline = activeUser.includes(user?._id);

  return (
    <Link to={"/"+user?._id} onClick={onClose} className="flex items-center p-1 gap-3 lg:p-3 border border-transparent border-b-slate-200 hover:border hover:border-blue-700 rounded-full cursor-pointer">
        <div className="relative w-12 h-12 overflow-hidden rounded-full cursor-pointer hover:ring-2 hover:ring-blue-800 transition-all duration-300">      
          {user?.profile_pic?.secure_url ? (
            <img
              src={user.profile_pic.secure_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={35} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
          )} 

        {isOnline && (
          <span className="absolute bottom-2 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}       
        </div> 

        <div>
          <div className="font-semibold text-ellipsis line-clamp-1">
            {user?.name}
          </div>
          <div className="text-sm text-ellipsis line-clamp-1">
            {user?.email}
          </div>
        </div> 
    </Link>
  );
}

export default UserCard;
