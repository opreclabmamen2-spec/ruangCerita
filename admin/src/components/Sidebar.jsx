import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const logout = () => {
    localStorage.removeItem("atoken");

    window.location.href = "/";
  };

  return (
    <div className="flex fixed left-0 h-screen w-64 flex-col justify-between border-r border-[#EEE5DC] bg-white">
      {/* Top */}
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Mental<span className="text-[#D8BFA7]">Care</span>
          </h1>

          <p className="text-xs text-gray-500 mt-1">Administrator Panel</p>
        </div>

        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-[#F5EFE9] text-black"
                    : "text-gray-600 hover:bg-[#FAF8F5]"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-[#F5EFE9] text-black"
                    : "text-gray-600 hover:bg-[#FAF8F5]"
                }`
              }
            >
              Riwayat Deteksi
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-[#F5EFE9] text-black"
                    : "text-gray-600 hover:bg-[#FAF8F5]"
                }`
              }
            >
              Kelola FAQ
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#EEE5DC] p-5">
        <div className="mb-4">
          <p className="font-semibold">Nahdiah</p>

          <p className="text-xs text-gray-500">adminbicara@gmail.com</p>
        </div>

        <button
          onClick={logout}
          className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
