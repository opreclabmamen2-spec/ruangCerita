import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { Calendar } from "lucide-react";

const HistoryPage = () => {
  const { historyData, getHistoryData } = useContext(AdminContext);

  useEffect(() => {
    getHistoryData();
  }, []);

  console.log(historyData);

  const filteredData = historyData;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Detection History
          </h1>

          <p className="text-slate-500 mt-2">
            View all mental health prediction history.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Records</p>

          <h2 className="text-3xl font-bold">{historyData.length}</h2>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr className="text-xs uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Text</th>
              <th className="px-6 py-4 text-center">Result</th>
              <th className="px-6 py-4 text-center">Confidence</th>
              <th className="px-6 py-4 text-right">Created</th>
            </tr>
          </thead>

          <tbody>
            {historyData.map((item) => (
              <tr
                key={item._id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                {/* USER */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {item.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-medium text-slate-900">
                        {item.name}
                      </h3>

                      <p className="text-sm text-slate-500">{item.email}</p>
                    </div>
                  </div>
                </td>

                {/* TEXT */}
                <td className="max-w-md px-6 py-5">
                  <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </td>

                {/* RESULT */}
                <td className="px-6 py-5 text-center">
                  <Status prediction={item.prediction} />
                </td>

                {/* CONFIDENCE */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{
                          width: `${item.confidence}%`,
                        }}
                      />
                    </div>

                    <span className="w-12 text-sm font-medium text-slate-700">
                      {item.confidence.toFixed(1)}%
                    </span>
                  </div>
                </td>

                {/* DATE */}
                <td className="px-6 py-5 text-right">
                  <div className="text-sm text-slate-700">
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  <div className="text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Status = ({ prediction }) => {
  const styles = {
    Normal: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Anxiety: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    Depression: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    Suicidal: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[prediction]
      }`}
    >
      {prediction}
    </span>
  );
};

export default HistoryPage;
