import React, { useState } from "react";

const PromptBox = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (!prompt.trim()) return;
    onSubmit?.(prompt);
    setPrompt("");
  };

  return (
    <div className="max-w-2xl w-full h-full bg-orange-50 border border-slate-300 rounded-xl overflow-hidden mt-6 shadow-sm">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ceritakan apa yang kamu rasakan disini...."
        rows="4"
        className="w-full p-3 pb-0 resize-none outline-none bg-transparent text-md"
      />

      <div className="flex items-center justify-end pb-3 px-3">
        

        {/* SEND BUTTON */}
        <button
          onClick={handleSend}
          className="flex items-center justify-center p-1 rounded-lg size-10 bg-orange-500 hover:bg-orange-600 transition"
          aria-label="Send"
        >
          <svg width="12" height="13" viewBox="0 0 11 12" fill="none">
            <path
              d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PromptBox;
