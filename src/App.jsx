import React, { useState } from 'react'
import Navbar from "./components/Navbar/Navbar";
import Main from "./pages/Main";
import Subscribe from "./components/Subscribe/Subscribe";
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const App = () => {
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  return (
    <div>
      <Navbar setLogin = {setLogin} setRegister = {setRegister} />
      <Main />
      <Subscribe />
      <Footer />
      {showLogin && <Login setLogin = {setLogin} />}
      {showRegister && <Register setRegister = {setRegister} />}
    </div>
  )
}

export default App
