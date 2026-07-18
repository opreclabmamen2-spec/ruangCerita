import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, LockKeyhole, CircleUser } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const LoginForm = ({ onClose }) => {
  const [state, setState] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { token, registerUser, loginUser } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let success = false;

    if (state === "register") {
      success = await registerUser(name, email, password);
    } else {
      success = await loginUser(email, password);
    }

    if (success) {
      onClose();
      navigate("/");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <form
      className="flex flex-col gap-4 sm:gap-5 w-full"
      onSubmit={onSubmitHandler}
    >
      {/* TITLE */}
      <div className="text-center mb-2 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {state === "login" ? "Selamat Datang" : "Buat Akun Baru"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {state === "login"
            ? "Masuk untuk melanjutkan"
            : "Daftar untuk memulai analisis Anda"}
        </p>
      </div>

      {/* NAME */}
      {state === "register" && (
        <div className="relative w-full">
          <CircleUser
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />
        </div>
      )}

      {/* EMAIL */}
      <div className="relative w-full">
        {/* ICON */}
        <Mail
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        {/* INPUT */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm sm:text-base"
        />
      </div>

      {/* PASSWORD */}
      <div className="relative w-full">
        <LockKeyhole
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm sm:text-base"
        />

        {/* 👁️ ICON */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="bg-black hover:bg-gray-900 text-white py-2.5 sm:py-3 rounded-lg font-medium cursor-pointer transition text-sm sm:text-base"
      >
        {state === "login" ? "Masuk" : "Buat Akun"}
      </button>

      {/* SWITCH */}
      <p className="text-sm text-gray-500 text-center sm:text-left">
        {state === "login" ? (
          <>
            Belum punya akun?{" "}
            <span
              onClick={() => setState("register")}
              className="text-gray-500 cursor-pointer font-medium underline hover:text-gray-700 transition"
            >
              Daftar Sekarang
            </span>
          </>
        ) : (
          <>
            Sudah punya akun?{" "}
            <span
              onClick={() => setState("login")}
              className="text-gray-500 cursor-pointer font-medium underline hover:text-gray-700 transition"
            >
              Masuk
            </span>
          </>
        )}
      </p>
    </form>
  );
};

export default LoginForm;