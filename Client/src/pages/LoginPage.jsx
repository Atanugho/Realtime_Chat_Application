import { useDispatch } from 'react-redux';
import  Layout  from '../Layouts/Layout.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '@/Redux/Slices/AuthSlice.js';
import toast from "react-hot-toast"

function LoginPage() {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData,setLoginData] = useState({
    email:"",
    password:"",
  })

  function handleUserInput(e){
    const {name,value} = e.target;

    setLoginData({
      ...loginData,
      [name]: value
   });
  }

   async function onLogin(e){
      e.preventDefault();
      if(!loginData.email || !loginData.password){
          toast.error("Please fill all the fields");
          return
      }

      const response = await dispatch(login(loginData));

      
      localStorage.setItem('token',response?.payload?.token);

      if(response?.payload?.success)
          navigate("/");

      setLoginData({
          email: "",
          password: "",
      });
    }    
  

  return (
    <Layout>
            <div className="flex items-center justify-center h-[90vh]">
                <form noValidate  onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold ">Login Page</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold ">Email</label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter Your Email"
                            className="bg-transparent px-2 py-1 border focus:outline-blue-700 shadow-xl"
                            onChange={handleUserInput}
                            value={loginData.email}
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
                            className="bg-transparent px-2 py-1 border focus:outline-blue-700 shadow-xl"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button  type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                       Login
                    </button>

                    <p className="text-center">
                        Donot have an account? <Link to="/register" className="link text-accent cursor-pointer  font-bold text-blue-700">Register</Link>  
                    </p>
                    <p className='text-center'>
                        <Link to="/forgot-password" className="link text-accent cursor-pointer  font-bold text-blue-700">Forgot Password</Link>
                    </p>
                </form>
            </div>
        </Layout>
  )
}

export default LoginPage;