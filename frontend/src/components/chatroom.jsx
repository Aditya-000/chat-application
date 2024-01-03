import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';



const chatroom = ({username , setLoggedInUser , navigate, socket}) => {
    const [message , setMessage] = useState("");
    const [messages, setMessages] = useState([]);
   

    useEffect(() => {
        // Listen for incoming messages
        console.log('Socket connected:', socket.connected);
        socket.on('recieved-message', (message) => {
          setMessages([...messages, message]);
        });
    
        // Clean up socket connection on component unmount
       
      }, [messages]);

      

    function sendMessage(){
        const data = {"user" : username , "content":message , time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}
        !message == "" ?  socket.emit("send-message",data) :
        alert("Message cannot be empty");
        setMessage("");
    }

    function logoutHandler(){
        navigate("/");
        setLoggedInUser("");
    }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <div className='w-full h-full lg:w-[70%] lg:h-[90%] border-[1px] solid border-black rounded'>
            <div className='h-[10%] w-[100%] bg-gray-600 text-white text-center p-2 text-2xl font-sans flex justify-between px-4 items-center'>
               <h1> Starter Room ^-^ </h1>
               <button className='border-white solid border-[2px] text-sm p-2 rounded-md' onClick={logoutHandler} >Log Out</button>
            </div>
            <div className='h-[84%] overflow-scroll'>
                   {
                      messages.map( (message ,index) => {
                       return (<div key={index} className={`w-fit h-fit bg-gray-500 text-white flex font-mono mt-2 rounded-md justify-center items-center ${username === message.user && "ml-auto" }`}>
                        <div className='p-2 bg-gray-600 text-white rounded-lg flex'>
                              <span className='text-xs mr-2 text-gray-200 text-center'>{message.user + " -"}</span>
                              <h3 className='flex font-semibold font-mono mr-2 text-center text-sm'>{message.content}</h3>
                              <h3 className='text-xs mr-2 text-black text-right'>{message.time}</h3>       
                        </div>
                        </div>)
                      })
                    }
            </div>
            <div className='w-[100%] h-[6%] bg-black rounded'>
                <input className='h-full px-2 outline-none w-[90%] border-[1px] solid border-gray-500 ' type="text" placeholder='Type your message' value={message} onChange={ (e) => setMessage(e.target.value)}/>
                <button onClick={sendMessage} className='text-white text-center h-full w-[10%] bg-gray-700 lg:
                text-xl font-mono border-gray-950 hover:bg-gray-950'>Send</button>
            </div>
        </div>
    </div>
  )
}

export default chatroom;