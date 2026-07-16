import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const FaqPage = () => {
  const { faqData, getFAQ, addFAQ, updateFAQ, deleteFAQ } =
    useContext(AdminContext);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getFAQ();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateFAQ(editId, question, answer);
    } else {
      await addFAQ(question, answer);
    }

    setQuestion("");
    setAnswer("");
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">FAQ Management</h1>

          <p className="text-slate-500 mt-1">
            Kelola pertanyaan yang sering diajukan pengguna.
          </p>
        </div>

        <button
          onClick={() => {
            setQuestion("");
            setAnswer("");
            setEditId(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white shadow-lg hover:scale-105 transition cursor-pointer"
        >
          <Plus size={18} />
          Tambah FAQ
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="w-16 py-4 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
                No
              </th>

              <th className="py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Pertanyaan
              </th>

              <th className="py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Jawaban
              </th>

              <th className="w-32 py-4 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {faqData.map((item, index) => (
              <tr
                key={item.faqId}
                className="group border-b border-slate-100 transition-colors hover:bg-slate-50/60"
              >
                <td className="py-5 text-center">
                  <span className="text-sm font-medium text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </td>

                <td className="py-5 pr-8">
                  <p className="font-medium text-slate-900">{item.question}</p>
                </td>

                <td className="py-5 pr-8">
                  <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                    {item.answer}
                  </p>
                </td>

                <td>
                  <div className="flex justify-center gap-1 transition-all duration-200">
                    <button
                      onClick={() => {
                        setEditId(item.faqId);
                        setQuestion(item.question);
                        setAnswer(item.answer);
                        setShowModal(true);
                      }}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteFAQ(item.faqId)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-7 py-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editId ? "Edit FAQ" : "Tambah FAQ"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Isi informasi FAQ di bawah ini.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={submitHandler} className="space-y-6 p-7">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Pertanyaan
                </label>

                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Masukkan pertanyaan..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Jawaban
                </label>

                <textarea
                  rows={6}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Masukkan jawaban..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-slate-600 transition hover:bg-slate-100"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-white transition hover:bg-slate-800 cursor-pointer"
                >
                  {editId ? "Simpan Perubahan" : "Tambah FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqPage;
