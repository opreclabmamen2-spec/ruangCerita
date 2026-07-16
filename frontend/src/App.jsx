import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.";
import Analisis from "./pages/Analisis";
import Tentang from "./pages/Tentang.";
import Navbar from "./components/Navbar";
import { assets } from "./assets/assets";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import TestRechart from "./pages/TestRechart"
import AOS from "aos";
import "aos/dist/aos.css"

const App = () => {
  const [open, setOpen] = useState(false);
  useEffect(()=> {
    AOS.init({
      duration: 1000,
    })
  })

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      {/* NAVBAR */}

      <ToastContainer/>
      <div className="w-full flex justify-center mt-4">
        <Navbar openModal={() => setOpen(true)} />
      </div>

      {/* CONTENT */}
      <div className="w-full max-w-7xl px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analisis />} />
          <Route path="/about" element={<Tentang />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/recht" element={<TestRechart/>}/>
        </Routes>
      </div>

      {/* MODAL LOGIN */}
      <Login open={open} onClose={() => setOpen(false)} />

      <Footer />
    </div>
  );
};

export default App;