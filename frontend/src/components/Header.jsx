import React from "react";

const Header = ({
  badgeSubtext = "",
  title,
  description,
  primaryBtnText,
  secondaryBtnText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <section className="flex flex-col items-center text-center w-full mx-auto mt-12 md:mt-25 ">
      {/* BADGE */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 text-xs sm:text-sm" data-aos="zoom-in" data-aos-delay="100">
        <span className="flex items-center gap-2 text-blue-600">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex size-2 rounded-full bg-blue-600"></span>
          </span>
          
        </span>

        {badgeSubtext && (
          <span className="text-zinc-700 text-xs sm:text-sm">
            {badgeSubtext}
          </span>
        )}
      </div>

      {/* TITLE */}
      <h1
      data-aos="fade-up" data-aos-delay="200"
        className="mt-6 font-semibold leading-tight
        text-5xl sm:text-6xl md:text-5xl lg:text-7xl/18"
      >
        {title}
      </h1>

      {/* DESCRIPTION */}
      {description && (
        <p
        data-aos= "fade-up"
        data-aos-delay="350"
          className="mt-4 text-zinc-600
          text-sm 
          max-w-md md:max-w-xl"
        >
          {description}
        </p>
      )}

      {/* BUTTON */}
      <div className="flex flex-wrap justify-center gap-3 mt-7 md:mt-10" data-aos="fade-up" data-aos-delay="500">
        {primaryBtnText && (
          <button
            onClick={onPrimaryClick}
            className="bg-black text-white
              px-5 py-2.5 sm:px-6 sm:py-3
              text-sm sm:text-base cursor-pointer
              rounded-xl hover:bg-zinc-800 hover:scale-105 transition duration-300 active:scale-100"
          >
            {primaryBtnText}
          </button>
        )}

        {secondaryBtnText && (
          <button
            onClick={onSecondaryClick}
            className="border border-zinc-400 text-zinc-800 
      px-5 py-2.5 sm:px-6 sm:py-3 
      rounded-xl text-sm sm:text-base 
      transition cursor-pointer group "
          >
            <div className="relative overflow-hidden leading-tight">
              <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                {secondaryBtnText}
              </span>
              <span className="absolute top-0 left-0 block transition-transform duration-200 translate-y-full group-hover:translate-y-0">
                {secondaryBtnText}
              </span>
            </div>
          </button>
        )}
      </div>
    </section>
  );
};

export default Header;
