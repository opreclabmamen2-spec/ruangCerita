import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const MAX_CHARS = 300;

const PromptBox = ({ onSubmit, isLoading = false }) => {
  const [prompt, setPrompt] = useState("");

  const remaining = MAX_CHARS - prompt.length;
  const isNearLimit = remaining <= 30 && remaining >= 0;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setPrompt(value);
    } else {
      setPrompt(value.slice(0, MAX_CHARS));
    }
  };

  const handleSend = () => {
    const trimmed = prompt.trim();
    if (!trimmed || trimmed.length > MAX_CHARS || isLoading) return;
    onSubmit?.(trimmed);
    setPrompt("");
  };

  const handleKeyDown = (e) => {
    // Enter untuk kirim, Shift+Enter untuk baris baru (kebiasaan chat box)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl w-full bg-orange-50 border border-slate-300 rounded-xl lg:rounded-2xl overflow-hidden mt-5 sm:mt-6 lg:mt-8 shadow-sm">
      <textarea
        value={prompt}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ceritakan apa yang kamu rasakan disini...."
        rows="3"
        maxLength={MAX_CHARS}
        disabled={isLoading}
        className="w-full h-24 sm:h-28 lg:h-36 p-3 sm:p-4 lg:p-5 pb-0 resize-none outline-none bg-transparent text-sm sm:text-base lg:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      />

      <div className="flex items-center justify-between gap-2 pb-3 sm:pb-4 lg:pb-5 px-3 sm:px-4 lg:px-5">
        {/* CHAR COUNTER / STATUS */}
        <span
          className={`text-xs sm:text-sm tabular-nums ${
            isLoading
              ? "text-orange-600 font-medium animate-pulse"
              : isNearLimit
              ? "text-orange-600 font-medium"
              : "text-slate-400"
          }`}
        >
          {isLoading ? "Menganalisis..." : `${prompt.length}/${MAX_CHARS}`}
        </span>

        {/* SEND BUTTON */}
        <button
          onClick={handleSend}
          disabled={!prompt.trim() || isLoading}
          className="flex items-center justify-center p-1 rounded-lg lg:rounded-xl size-9 sm:size-10 lg:size-12 bg-orange-500 hover:bg-orange-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-orange-500 transition shrink-0"
          aria-label={isLoading ? "Sedang menganalisis" : "Kirim"}
        >
          {isLoading ? (
            <Loader2 className="animate-spin text-white" size={16} />
          ) : (
            <svg
              width="12"
              height="13"
              viewBox="0 0 11 12"
              fill="none"
              className="lg:w-4 lg:h-[17px]"
            >
              <path
                d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptBox;