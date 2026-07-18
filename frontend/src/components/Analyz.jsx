import React, { useState, useContext } from "react";
import PromptBox from "./PromptBox";
import { TypeAnimation } from "react-type-animation";
import { Loader2 } from "lucide-react";
import Result from "./Result";
import { AppContext } from "../context/AppContext";

const Analyz = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { analyzText } = useContext(AppContext);

  const handleAnalyze = async (text) => {
    setIsLoading(true);
    setResult(null); // biar hasil lama nggak nyangkut sementara nunggu hasil baru

    try {
      const response = await analyzText(text);
      console.log(response);

      if (response) {
        setResult(response);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-full text-center mt-12 sm:mt-16 md:mt-20 px-4">
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-slate-800 font-semibold leading-snug max-w-3xl">
        <TypeAnimation
          sequence={[
            "Ada yang ingin kamu ceritakan?",
            50000,
            "Apa yang sedang kamu rasakan hari ini?",
            5000,
            "Lagi ngerasa apa? Ceritain aja di sini",
            5000,
          ]}
          speed={50}
          repeat={Infinity}
        />
      </h1>

      {/* SUBTITLE */}
      <p className="text-sm md:text-base mt-3 sm:mt-4 text-slate-600 px-2">
        Santai aja, mulai dari apa yang lagi kamu rasakan sekarang.
      </p>

      {/* Input Box */}
      <PromptBox onSubmit={handleAnalyze} isLoading={isLoading} />

      {/* LOADING STATE */}
      {isLoading && (
        <div className="flex flex-col items-center gap-3 mt-8 sm:mt-10 text-slate-500">
          <Loader2 className="animate-spin text-orange-500" size={28} />
          <p className="text-sm sm:text-base">
            Sedang menganalisis apa yang kamu rasakan, tunggu sebentar ya...
          </p>
        </div>
      )}

      {/* Result */}
      {!isLoading && <Result result={result} />}
    </section>
  );
};

export default Analyz;