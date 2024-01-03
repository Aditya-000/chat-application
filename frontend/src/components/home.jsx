import React from 'react'
import { useState } from 'react';






const home = ({setLoggedInUser,navigate}) => {
 const [user , SetUser] = useState(null);


 function handleSubmit(event){
   event.preventDefault();
   if(user.length > 0){
    setLoggedInUser(user);
    navigate("/chatroom");
   }
 }


  return (
    <div className="flex justify-center items-center w-screen h-screen">
        <form  onSubmit={handleSubmit} >
        <div className='flex flex-col border-[2px] solid border-gray-500 rounded-[10px] w-[280px] h-[230px] lg:w-[400px] lg:h-[250px]'>
            <div className='mt-5'>
                <h1 className='text-gray-500 text-4xl font-mono font-semibold text-center'>Welcome!</h1>
            </div>
            <div className='flex flex-col font-mono p-10'>
                <label className='text-xl text-gray-500' htmlFor="username">Username </label>
                <input className='p-2 border-[2px] outline-none solid border-gray-500 rounded-lg mb-3' type="text" placeholder='Enter username' id='username' value={user} onChange={ (e) => SetUser(e.target.value)}/>
                <button className='bg-gray-500 p-1 rounded-md text-white hover:bg-gray-700 border-[2px] solid border-gray-500'>Start Chat</button>
            </div>
        </div>
        </form>
    </div>
  )
 
}

export default home;