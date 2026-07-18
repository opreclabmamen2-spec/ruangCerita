import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CTASection = ({createAccount, Analyze}) => {
  const { token } = useContext(AppContext);

  return (
    <section
      data-aos="zoom-in-up"
      data-aos-duration="1000"
      className="flex flex-col items-center justify-center mx-auto 
  max-w-6xl w-full mt-30 text-center 
  rounded-2xl py-16 md:py-20 px-6
  bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/banners/image-2.png')] 
  bg-cover bg-center bg-no-repeat relative overflow-hidden"
    >
      {/* 🔥 overlay biar tone sesuai web */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          className="text-2xl md:text-3xl font-semibold text-white max-w-2xl leading-snug"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Kenali Kondisi Mental Anda dengan Bantuan AI
        </h1>

        <div
          className="h-[2px] w-20 my-3 bg-gradient-to-r from-transparent via-white to-transparent"
          data-aos="zoom-in"
          data-aos-delay="350"
        />

        <p
          className="text-sm md:text-base text-white/80 max-w-xl"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          Analisis teks untuk mendeteksi Anxiety, Depression, atau Suicidal.
          Login sekarang untuk menyimpan dan melihat riwayat analisis Anda.
        </p>

        {!token ? (
        <button onClick={createAccount}
          data-aos="zoom-in"
          data-aos-delay="650"
          className="mt-6 px-8 py-3 text-sm md:text-base 
      bg-white text-black font-medium
      rounded-full 
      hover:bg-zinc-200 hover:scale-105 
      transition duration-300 active:scale-100 cursor-pointer"
        >
          Buat Akun
        </button>) : (
          <button onClick={Analyze}
          data-aos="zoom-in"
          data-aos-delay="650"
          className="mt-6 px-8 py-3 text-sm md:text-base 
      bg-white text-black font-medium
      rounded-full 
      hover:bg-zinc-200 hover:scale-105 
      transition duration-300 active:scale-100 cursor-pointer"
        >
          Analisis
        </button>
        ) }
      </div>
    </section>
  );
};

export default CTASection;
