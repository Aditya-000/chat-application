import Home from "./components/home"
import Chatroom from "./components/chatroom"
import  {Route, Routes , useNavigate} from "react-router-dom"
import { useState , useEffect } from "react"
import io from "socket.io-client"

const socket = io.connect("http://localhost:5000");


function App() {
  const [isLoggedIn , setIsLoggedIn] = useState("");
  const navigate = useNavigate();
 


  return (
    <div>
           <Routes>
              <Route path="/"  element={<Home setLoggedInUser={setIsLoggedIn} navigate={navigate} />}/>
              <Route path="/chatroom"  element={!isLoggedIn == "" ? <Chatroom username={isLoggedIn} setLoggedInUser={setIsLoggedIn} navigate={navigate} socket={socket} /> : <Home setLoggedInUser={setIsLoggedIn} navigate={navigate} />}/>
           </Routes>
    </div>
  
  )
}

export default App


