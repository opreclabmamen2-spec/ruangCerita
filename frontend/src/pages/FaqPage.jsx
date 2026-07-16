import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const { faqData, getFaq } = useContext(AppContext);

  useEffect(() => {
    getFaq();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <p className="text-[#C49A6C] font-semibold tracking-[4px] uppercase text-sm">
          FAQ
        </p>

        <h1 className="text-4xl font-bold text-[#2D1B46] mt-3">
          Informasi Umum
        </h1>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Kumpulan informasi yang membantu Anda memahami cara kerja dan fitur-fitur yang tersedia di MentalCare.
        </p>
      </div>

      <div className="space-y-5">
        {faqData.map((faq, index) => (
          <div
            key={faq.faqId || faq._id}
            className="bg-white/50 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-7 py-4 flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold text-left text-gray-800">
                {faq.question}
              </h3>

              <div className="w-10 h-10 rounded-full bg-[#F8F5F2] flex items-center justify-center">
                <span
                  className={`text-2xl transition-all duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </div>
            </button>

            <div
              className={`transition-all duration-500 overflow-hidden ${
                openIndex === index ? "max-h-60" : "max-h-0"
              }`}
            >
              <div className="px-7 pb-6 pt-2 bg-[#FAFAFA]">
                <p className="leading-8 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
