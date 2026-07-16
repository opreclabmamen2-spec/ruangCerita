import React from "react";
import { assets } from "../assets/assets";

const AboutSection = () => {
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-semibold text-center mt-10 mx-auto">
        Tentang Website Ini
      </h1>
      <p className="text-md text-slate-500 text-center mt-2  mx-auto">
        Aplikasi ini dikembangkan untuk membantu remaja mengenali kondisi
        kesehatan mental <br />
        sejak dini melalui analisis teks berbasis Artificial Intelligence.
      </p>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
        <img
          className="max-w-sm w-full rounded-xl h-auto"
          src={assets.about}
          alt=""
        />
        <div>
          <h1 className="text-3xl font-semibold">Fitur Utama</h1>
          <p className="text-sm text-slate-500 mt-2">
            Sistem ini menggunakan Natural Language Processing (NLP) untuk
            menganalisis perasaan pengguna dan mengelompokkan kondisi mental
            seperti anxiety, depression, normal, dan suicidal.
          </p>

          <div className="flex flex-col gap-10 mt-6">
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Deteksi Dini Kondisi Mental
                </h3>
                <p className="text-sm text-slate-500">
                  Menganalisis teks pengguna untuk mengidentifikasi kondisi
                  mental secara otomatis.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Monitoring Perkembangan
                </h3>
                <p className="text-sm text-slate-500">
                  Menyimpan riwayat hasil analisis untuk melihat perubahan
                  kondisi dari waktu ke waktu.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Privasi & Keamanan
                </h3>
                <p className="text-sm text-slate-500">
                  Data pengguna disimpan dengan aman dan hanya digunakan untuk
                  keperluan analisis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <h3 className="text-md text-center font-bold text-gray-500 max-w-lg mx-auto mt-5 pb-10">
        *Hasil analisis tidak menggantikan diagnosis profesional. Disarankan
        untuk berkonsultasi dengan psikolog atau tenaga ahli.
      </h3>

      {/* Contact / Bantuan */}

      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-white/50 backdrop-blur-md border border-slate-200 rounded-3xl p-10 shadow-sm">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-800">
              Butuh Bantuan?
            </h2>

            <p className="text-slate-500 mt-3 max-w-2xl mx-auto leading-7">
              Jika Anda mengalami kendala saat menggunakan MentalCare atau
              memiliki pertanyaan mengenai fitur yang tersedia, silakan hubungi
              kami melalui kontak berikut.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-50 flex items-center justify-center">
                📧
              </div>

              <h3 className="font-semibold text-slate-700 mt-4">Email</h3>

              <p className="text-sm text-slate-500 mt-2">
                support@mentalcare.com
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center">
                💬
              </div>

              <h3 className="font-semibold text-slate-700 mt-4">WhatsApp</h3>

              <p className="text-sm text-slate-500 mt-2">+62 895-0746-9438</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 flex items-center justify-center">
                🕒
              </div>

              <h3 className="font-semibold text-slate-700 mt-4">Jam Layanan</h3>

              <p className="text-sm text-slate-500 mt-2">
                Senin - Jumat
                <br />
                08.00 - 17.00 WIB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
