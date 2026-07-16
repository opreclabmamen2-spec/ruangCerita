import React from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const { loginAdmin, token } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let success = false;
    success = await loginAdmin(email, password);

    if (success) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-6"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#EEE5DC] p-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Mental<span className="text-[#D8BFA7]">Care</span>
          </h1>

          <p className="text-gray-500 mt-3">Dashboard Administrator</p>
        </div>

        <div className="mt-10">
          <label className="text-sm font-medium text-gray-700">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6DDD4]
        bg-[#FCFBFA]
        focus:outline-none
        focus:border-[#D8BFA7]
        transition"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-2 px-4 py-3 rounded-xl border border-[#E6DDD4]
        bg-[#FCFBFA]
        focus:outline-none
        focus:border-[#D8BFA7]
        transition"
          />
        </div>

        <button
          className="mt-8 w-full bg-black text-white py-3 rounded-xl
      hover:bg-neutral-800 transition font-semibold"
        >
          Masuk
        </button>

        <p className="mt-8 text-center text-xs text-gray-400">
          ©{new Date().getFullYear()} MentalCare. All rights reserved
        </p>
      </div>
    </form>
  );
};

export default Login;
