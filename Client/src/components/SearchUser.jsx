import { useEffect, useState } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import UserCard from "./UserCard";
import toast from "react-hot-toast";
import axiosInstance from "../helper/axiosInstance";
import { SlClose } from "react-icons/sl";


function SearchUser({onClose}) {

    const [searchUser,setSearchUser] = useState([])
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState("")

    const handleSearchUser = async() => {

        try {
            setLoading(true)
            const response = await axiosInstance.post("/auth/search-user", {
                search: search
            })

            setLoading(false)
           
           setSearchUser(response.data.data)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect( () => {
        handleSearchUser()
    }, [search])


  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
        <div className='w-full max-w-lg mx-auto mt-10 '>
            <div className='bg-white rounded h-12 overflow-hidden flex '>
                <input type='text' 
                placeholder='Seacrh user by Name,Email...'
                className='w-full outline-none py-1 h-full px-2'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                />
                <div className="h-12 w-12 flex items-center justify-center">
                    <BsFillSearchHeartFill  size={25}/>                    
                </div>
            </div>

            <div className="bg-white mt-2 w-full p-4 rounded ">
                <h2 className='text-xl font-bold text-slate-800'>Search Results</h2>
                <div className='h-30 overflow-y-auto scrollbar mt-2'>
                    {
                        loading ? (
                            <div className='flex justify-center items-center'>
                                <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500'></div>
                            </div>

                        ) : (
                            searchUser.length === 0 ? (
                                <div className='flex justify-center items-center'>
                                    <p className='text-lg text-slate-600'>No user found</p>
                                </div>
                            ) : (
                                searchUser.length !== 0 && !loading && (
                                    searchUser.map((user,index) => {
                                        return (
                                            <UserCard key={user._id} user={user}  onClose={onClose}/>
                                        )
                                    })
                                )
                            )
                        )
                    }
                </div>
            </div>
        </div>

        <div className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white" onClick={onClose}>
            <button>
                <SlClose />
            </button>
        </div>
    </div>
  )
}

export default SearchUser;