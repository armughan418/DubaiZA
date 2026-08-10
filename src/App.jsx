import React, { useState } from 'react'
import Navbar from "./components/Navbar/Navbar";
import Main from "./pages/Main";
import Subscribe from "./components/Subscribe/Subscribe";
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Electronics from './pages/Electronics';
import FurGar from './pages/FurGar';
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  return (
    <>
      <Navbar setLogin = {setLogin} setRegister = {setRegister} />
      <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/furniture-garden" element={<FurGar />} />
            </Routes>
      <Subscribe />
      <Footer />
      {showLogin && <Login setLogin = {setLogin} />}
      {showRegister && <Register setRegister = {setRegister} />}
    </>
  )
}

export default App
