import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
import { useState } from "react";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";

function Sidebar() {
    const user = useSelector(state => state?.auth?.data);

    const [allUser,setAllUser] = useState([]);
    const [openSearchUser,setOpenSearchUser] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProfileClick = () => {
        navigate('/me'); 
    };

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/login'); 
    };

    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            
                <div className='bg-slate-700 w-12 h-full py-5 text-slate-600 flex flex-col justify-between'>
                    <div>
                        <NavLink 
                            className={({isActive}) =>`w-12 h-12 flex justify-center items-center cursor-pointer text-white hover:bg-blue-500 rounded ${isActive && "bg-slate-400"}`} 
                            title='Chat'>
                            <IoChatbubbleEllipsesSharp size={25} />
                        </NavLink>
                        <div onClick={() => setOpenSearchUser(true)} className="w-12 h-12 mt-2 flex justify-center items-center cursor-pointer text-white hover:bg-blue-500  rounded" title='Add Friend'>
                            <FaUserPlus size={35} />
                        </div>
                    </div>
                    <div>
                        <button 
                            className="w-12 h-12 flex justify-center items-center cursor-pointer text-white hover:bg-blue-500 overflow-hidden rounded-full" 
                            title={user?.name || "Profile"} 
                            onClick={handleProfileClick}
                        >
                            {user?.profile_pic?.secure_url ? (
                                <img
                                    src={user.profile_pic.secure_url}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaRegUserCircle size={35} />
                            )}
                        </button>

                        <button className="w-12 h-12 flex mt-3 justify-center items-center cursor-pointer text-white hover:bg-blue-500 rounded" 
                        title='Logout'
                        onClick={handleLogout}
                        >
                            <CgLogOut size={25} />
                        </button>
                    </div>
                </div>

                <div className="w-full bg-slate-500 ">
                    <div>
                        <h2 className="text-xl font-bold p-4 text-center text-white h-16 border-r-2 shadow-2xl">Chats</h2>
                    </div>

                    <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
                            {
                                allUser.length === 0 && (
                                    <div className="mt-12">
                                        <div className="flex justify-center items-center my-4 text-white">
                                            <FiArrowUpLeft
                                            size={50}
                                            />
                                        </div>
                                        <p className="text-lg text-center text-white">Explore users to start a conversation with.</p>
                                    </div>
                                )
                            }
                    </div>
                </div>
                {
                    openSearchUser && (
                        <SearchUser onClose={() => setOpenSearchUser(false)}/>
                    )
                }                  
        </div>
    )
}

export default Sidebar;
