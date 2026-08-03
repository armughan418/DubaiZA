import React from 'react'
import Navbar from "./components/Navbar/Navbar";
import Main from "./pages/Main";
import Subscribe from "./components/Subscribe/Subscribe";
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const App = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Subscribe />
      <Footer />
      <Login />
      <Register />
    </div>
  )
}

export default App
