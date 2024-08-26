import { useState } from 'react';
import  Layout  from '../Layouts/Layout.jsx';
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { isEmail } from '@/helper/regexMatcher.js';
import { useDispatch } from 'react-redux';
import { createAccount } from "../Redux/Slices/AuthSlice.js";
import toast from "react-hot-toast";


function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage,setPreviewImage] = useState("");
    
    const [signUpData,setSignupData] =  useState({
        name:"",
        email:"",
        password:"",
        profile_pic:""
    });

    function handleUserInput(e){
        const {name,value} = e.target;
        setSignupData({
            ...signUpData,
            [name]:value
        })
    };

    function getImage(e){
        e.preventDefault();

        const uplaodImage = e.target.files[0];

        if(uplaodImage){
            setSignupData({
                ...signUpData,
                profile_pic:uplaodImage
            });

            const reader = new FileReader();
            reader.readAsDataURL(uplaodImage);
            reader.addEventListener("load",function(){
                setPreviewImage(this.result);
            })
        }
    };

    async function registerUser (e){
        e.preventDefault();

        if(!isEmail(signUpData.email)){
            toast.error("Invalid Email");
        }


        const formData = new FormData();
        formData.append("name",signUpData.name);
        formData.append("email",signUpData.email);
        formData.append("password",signUpData.password);
        formData.append("profile_pic",signUpData.profile_pic);

        const res = await dispatch(createAccount(formData));
        if(res?.payload?.success){
            navigate("/login");
        }

        setSignupData({
            name:"",
            email:"",
            password:"",
            profile_pic:""
        });

        setPreviewImage("");
    }

  return (
    <Layout>
      <div className="flex items-center justify-center h-[90vh]">
                <form noValidate onSubmit={registerUser} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold ">Registration Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto bg-sky-400" />
                        )}
                    </label>
                    <input 
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-semibold ">Name</label>
                        <input
                            type="text"
                            required
                            name="name"
                            id="name"
                            placeholder="Enter Your Name"
                            className="bg-transparent px-2 py-2 border focus:outline-blue-700 shadow-xl"
                            onChange={handleUserInput}
                            value={signUpData.name}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold ">Email</label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter Your Email"
                            className="bg-transparent px-2 py-2 border focus:outline-blue-700 shadow-xl"
                            onChange={handleUserInput}
                            value={signUpData.email}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold ">Password</label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter Your Password"
                            className="bg-transparent px-2 py-2 border focus:outline-blue-700 shadow-xl"
                            onChange={handleUserInput}
                            value={signUpData.password}
                        />
                    </div>

                    <button  type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Register
                    </button>

                    <p className="text-center">
                        Already have an account ? <Link to="/login" className="link text-accent cursor-pointer font-bold text-blue-700">Login</Link>  
                    </p>
                </form>
            </div>
    </Layout>
  )
}

export default Register