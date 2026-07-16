import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = ({ openModal }) => {
  const { token, userData } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", to: "/" },
    { name: "Analisis", to: "/analysis" },
    { name: "Tentang", to: "/about" },
  ];

  return (
    <header className="w-full flex justify-center py-4">
      <nav className="relative flex items-center justify-between w-full max-w-4xl px-4 py-2 lg:py-4 mt-3 mx-3 shadow-lg shadow-black/5 border-2 border-white/40 rounded-xl bg-white/30 backdrop-blur-md">
        {/* LOGO */}
        <a href="#">
          <span className="font-semibold font-serif text-2xl">
            Mental<span className="text-[#D6BFA6] text-shadow-sm">Care</span>
          </span>
        </a>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-md ${
                  isActive ? "text-black font-semibold" : "text-zinc-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT ACTION */}
        <div className="flex items-center gap-2">
          {token ? (
            <NavLink to="/profile" className="group relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D6BFA6] to-[#B89C7D] text-white flex items-center justify-center font-semibold shadow-lg hover:scale-105 transition-all duration-300">
                {userData?.name?.[0]?.toUpperCase()}
              </div>

              <span className="absolute top-12 right-0 whitespace-nowrap opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded-md">
                Riwayat Analisis
              </span>
            </NavLink>
          ) : (
            <button
              onClick={openModal}
              className="hidden md:block bg-black text-white px-5 py-2 rounded-lg text-sm cursor-pointer"
            >
              Buat Akun
            </button>
          )}

          {/* Burger selalu tampil di mobile */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden px-3 py-2 bg-black text-white rounded-md"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-white/90 backdrop-blur-sm z-50 transition ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full  flex flex-col items-center justify-center gap-8  text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-2xl"
          >
            ✕
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
