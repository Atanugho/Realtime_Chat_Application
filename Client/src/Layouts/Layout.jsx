import logo from "../assets/chatapp_logo.jpeg";

function Layout({children}) {
  return (
    <>
        <header className='flex justify-center items-center text-3xl text-blue-500 py-3 shadow-md bg-white'>
            <img 
                src={logo}
                alt='ChatApp_Logo'
                height={80}
                width={50}
            />
            <p1>HeartBeat</p1>    
        </header>

        {children}

    </>
  )
}

export default Layout;