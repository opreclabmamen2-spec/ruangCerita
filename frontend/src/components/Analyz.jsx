import React, { useState, useContext } from "react";
import PromptBox from "./PromptBox";
import {TypeAnimation} from "react-type-animation";      
import Result from "./Result";
import { AppContext } from "../context/AppContext";

const Analyz = () => {
  const [result, setResult] = useState(null);

  const {analyzText} = useContext(AppContext)

  const handleAnalyze = async (text) => {
    const response = await analyzText(text);

    console.log(response);
    

    if (response) {
      setResult(response);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center w-full text-center mt-20 px-4">
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl text-slate-800 font-semibold">
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
      <p className="text-sm md:text-base mt-4 text-slate-600">
        Santai aja, mulai dari apa yang lagi kamu rasakan sekarang.
      </p>

      {/* Input Box */}
      <PromptBox onSubmit={handleAnalyze}/>

      {/* Result */}
      <Result result={result}/>
    </section>
  );
};

export default Analyz;
