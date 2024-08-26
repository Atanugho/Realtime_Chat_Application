import  Layout  from "../../Layouts/Layout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


const getRandomBgColorClass = () => {
    const bgColorClasses = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-gray-200',
        'bg-cyan-200',
        'bg-sky-200',
        'bg-blue-200'
    ];
    const randomIndex = Math.floor(Math.random() * bgColorClasses.length);
    return bgColorClasses[randomIndex];
}


function Profile() {

    const userData = useSelector((state) => state?.auth?.data);  
    const randomBgColor = getRandomBgColorClass();

    return (
        <Layout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className={`my-10 flex flex-col gap-4 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black] ${randomBgColor}`}>
                
                    <img
                        src={userData?.profile_pic?.secure_url}
                        className="w-40 m-auto rounded-full border border-black"
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.name}
                    </h3>
                    <div className="flex items-center justify-between gap-2">
                        <Link 
                            to="/me/change-password" 
                            className="w-1/2 bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 rounded-full font-semibold py-2 cursor-pointer text-center">
                                <button>Change password</button>

                        </Link>
                        <Link 
                            to="/me/edit-profile" 
                            className="w-1/2 bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 rounded-full font-semibold py-2 cursor-pointer text-center">
                                <button>Edit profile</button>
                        </Link>
                    </div>

                    <Link to="/">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 text-blue-600">
                            <AiOutlineArrowLeft /> Go back to Home
                        </p>
                    </Link>

                </div>
            </div>
        </Layout>
    );

}

export default Profile;