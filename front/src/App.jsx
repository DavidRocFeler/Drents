import Home from "./views/Home"
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login"
import SignUp from "./views/SingUp"
import Schedule from "./views/Schedule.jsx"
import MisTurnos from "./views/MisTurnos.jsx"

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/login" element={<Login/>} />  
      <Route path="/signup" element={<SignUp/>} />  
      <Route path="/schedule" element={<Schedule/>} />  
      <Route path="/appointments" element={<MisTurnos/>} />  
      </Routes>
    </>
  )
}

export default App
