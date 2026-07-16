import { useState } from "react"
import LoginForm from "../components/LoginForm"


const Login = ({open, onClose}) => {
  if (!open) return null;

  return (
     <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* CARD */}
      <div
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // ⛔ biar ga nutup kalau klik dalam
      >
        {/* HEADER */}
        <div className="flex justify-end text-2xl items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="mt-4">
          <LoginForm onClose={onClose}/>
        </div>
      </div>
    </div>
  )
}

export default Login
