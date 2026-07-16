import React from "react";
import VisualBar from "./VisualBar";

const Result = ({ result }) => {
  if (!result) return null;

  const { label, confidence, probabilities, message } = result;

  const colors = {
    Anxiety: "#F59E0B",
    Depression: "#EF4444",
    Normal: "#22C55E",
    Suicidal: "#8B5CF6",
  };

  

  return (
    <div className="mt-10 w-full max-w-3xl bg-white rounded-3xl shadow-md p-8 border border-[#D6BFA6]/20">

      {/* RESULT */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#2D2D2D]">
          {label}
        </h2>

        <p className="text-[#6B7280] mt-2">
          Confidence {confidence}%
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mt-6 bg-[#FAF7F3] border border-[#D6BFA6]/20 rounded-2xl p-4">
          <p className="text-[#6B7280] text-sm">
            {message}
          </p>
        </div>
      )}

      {/* DISCLAIMER */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D6BFA6]/20 bg-white text-xs shadow-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#D6BFA6] opacity-75 animate-ping"></span>
            <span className="relative inline-flex size-2 rounded-full bg-[#D6BFA6]"></span>
          </span>

          <span className="text-[#6B7280]">
            Hasil ini hanya sebagai indikasi awal dan bukan diagnosis profesional.
          </span>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gray-200 my-8"></div>

      {/* BREAKDOWN */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 place-items-center">
        {Object.entries(probabilities).map(([key, value]) => (
          <VisualBar
            key={key}
            label={key}
            value={value}
            color={colors[key]}
          />
        ))}
      </div>
    </div>
  );
};

export default Result;