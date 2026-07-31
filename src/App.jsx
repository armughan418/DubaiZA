import React from 'react'
import Navbar from "./components/Navbar/Navbar";
import Main from "./pages/Main";
import Subscribe from "./components/Subscribe/Subscribe";
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Subscribe />
      <Footer />
    </div>
  )
}

export default App
