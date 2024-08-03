import victory from "@/assets/victory.jpeg";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import  background  from "@/assets/logo2.jpg"

function Auth() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleLogin() {
    // Login logic
  }

  function handleSignup() {
    // Signup logic
  }



  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 ">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col ">
            <div className="flex items-center justify-center ">
              <h1 className="text-5xl font-bold md:text-6xl">
                Welcome
              </h1>
              <img src={victory} alt="victory_image" className="h-[100px]" />
            </div>
            <p className="font-medium text-center pt-5"> 
              Fill the details to get started with the chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="flex items-center justify-center w-ful bg-transparent">

                <TabsTrigger 
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-600 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>

                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-600 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>

              </TabsList>

              <TabsContent 
              className="flex flex-col gap-5 mt-10"
              value="login">
                <Input placeholder="Email" type="email" className="rounded-full p-6 value={email} onChange={(e)=>setEmail(e.target.value)}"  
                />
                <Input placeholder="Password" type="password" className="rounded-full p-6 value={password} onChange={(e)=>setPassword(e.target.value)}"  
                />
                <Button className="rounded-full p-6 bg-green-500 hover:bg-green-700">Login</Button>
              </TabsContent>
              
              <TabsContent 
              className="flex flex-col gap-5"
              value="signup">
                <Input placeholder="Email" type="email" className="rounded-full p-6 value={email} onChange={(e)=>setEmail(e.target.value)}"  
                />
                <Input placeholder="Password" type="password" className="rounded-full p-6 value={password} onChange={(e)=>setPassword(e.target.value)}"  
                />
                <Input placeholder="Confirm Password" type="password" className="rounded-full p-6 value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}"  
                />   
                <Button className="rounded-full p-6 bg-green-500 hover:bg-green-700">Login</Button>
             
             </TabsContent>

            </Tabs>
          </div>
        </div>

        <div className="hidden xl:flex justify-center items-center">
          <img src={background} alt="background_image" className="h-[500px] rounded-lg" />
        </div>
      </div>
    </div >
  )
}

export default Auth;
