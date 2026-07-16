import React from "react";
import { features } from "../assets/assets";

const Features = () => {
  return (
    <div>
      <section className="w-full mt-30" data-aos="fade-up">
        {/* LINE */}
        <div
          className="w-full h-px bg-[repeating-linear-gradient(to_right,#d4d4d8_0,#d4d4d8_8px,transparent_8px,transparent_16px)]"
          data-aos="zoom-in"
        />

        {/* CONTENT */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {features.map((item, index) => (
              <div data-aos="fade-up"
                data-aos-delay={index * 150}>

              <div
                data-aos-duration="800"
                key={index}
                className="bg-white/50 backdrop-blur-md border border-zinc-100 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition duration-300 p-8 flex flex-col min-h-[380px]"
              >
                {/* OPTIONAL BADGE */}
                {item.highlight && (
                  <div className="bg-zinc-200 px-2 py-1 rounded-full flex items-center gap-1.5 w-fit ml-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#00A63E"
                      stroke="#00A63E"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 7h6v6" />
                      <path d="m22 7-8.5 8.5-5-5L2 17" />
                    </svg>
                    <p className="text-xs text-zinc-600">45%</p>
                  </div>
                )}

                {/* IMAGE */}
                <div
                  className="flex-1 flex items-center justify-center"
                  data-aos="zoom-in"
                  data-aos-delay={index * 150 + 200}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full max-w-56 object-contain"
                  />
                </div>

                {/* TEXT */}
                <h3 className="text-base font-medium text-zinc-800 mt-6 text-left">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 mt-2 text-left ">
                  {item.desc}
                </p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
