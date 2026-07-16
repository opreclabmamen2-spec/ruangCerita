import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full mt-10 text-gray-800" data-aos="fade-up"
  data-aos-duration="800">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="flex items-center space-x-3" data-aos="zoom-in"
  data-aos-delay="100">
          <img
            alt=""
            className="h-16 md:h-50 w-auto object-contain"
            src={assets.mainLogo}
          />
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed"   data-aos="fade-up"
  data-aos-delay="250"
>
          Platform berbasis AI untuk membantu mendeteksi kondisi kesehatan
          mental seperti Anxiety, Depression, dan Suicidal melalui analisis
          teks. Gunakan secara bijak dan tetap konsultasikan dengan profesional
          untuk penanganan lebih lanjut.
        </p>
      </div>
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal" data-aos="fade-up"
  data-aos-delay="400">
          ©{new Date().getFullYear()} MentalCare. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
