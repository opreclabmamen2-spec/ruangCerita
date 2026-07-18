import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Activity, TrendingUp, ShieldCheck, HeartHandshake } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import "../utils/ChartConfig";
import { Line, Doughnut } from "react-chartjs-2";

const CATEGORY_COLORS = {
  Normal: "#3B8C7E",
  Anxiety: "#D9A441",
  Depression: "#6B7FA3",
  Suicidal: "#A34B4B",
};

const CATEGORY_SOFT_BG = {
  Normal: "bg-[#3B8C7E]/10 text-[#2F6F62]",
  Anxiety: "bg-[#D9A441]/10 text-[#A9791E]",
  Depression: "bg-[#6B7FA3]/10 text-[#4D5F82]",
  Suicidal: "bg-[#A34B4B]/10 text-[#8A3A3A]",
};

// ---------------------------------------------------------------------------
// Responsive helper — tracks whether the viewport is mobile-sized so chart.js
// options (which can't be controlled via Tailwind classes) can adapt too.
// ---------------------------------------------------------------------------
const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isMobile;
};

// ---------------------------------------------------------------------------
// Date helpers for day / week aggregation
// ---------------------------------------------------------------------------
const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const startOfWeek = (d) => {
  const x = new Date(d);
  const day = x.getDay(); // 0 = Sunday
  const diff = x.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
  x.setDate(diff);
  x.setHours(0, 0, 0, 0);
  return x;
};

const fmtDay = (d) =>
  d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

const fmtWeekRange = (weekStart) => {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  const startLabel = weekStart.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  const endLabel = end.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  return `${startLabel}–${endLabel}`;
};

const Profile = () => {
  const { history, userData, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("day"); // "day" | "week"
  const isMobile = useIsMobile();

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    toast.success("Keluar akun");
    navigate("/");
    window.scrollTo(0, 0);
  };

  const stats = useMemo(() => {
    if (!history?.length) {
      return { total: 0, dominant: "-", improvement: 0, avgNormal: 0 };
    }

    const latest = history[0];
    const avgNormal =
      history.reduce((acc, item) => acc + (item?.probabilities?.Normal || 0), 0) /
      history.length;

    return {
      total: history.length,
      dominant: latest.dominantLabel,
      avgNormal,
      improvement: avgNormal.toFixed(1),
    };
  }, [history]);

  const groupedChartData = useMemo(() => {
    if (!history?.length) return [];

    const buckets = new Map();

    history.forEach((item) => {
      const date = new Date(item.createdAt);
      const bucketDate = viewMode === "day" ? startOfDay(date) : startOfWeek(date);
      const key = bucketDate.getTime();

      if (!buckets.has(key)) {
        buckets.set(key, {
          date: bucketDate,
          count: 0,
          Normal: 0,
          Anxiety: 0,
          Depression: 0,
          Suicidal: 0,
        });
      }

      const bucket = buckets.get(key);
      bucket.count += 1;
      bucket.Normal += item?.probabilities?.Normal || 0;
      bucket.Anxiety += item?.probabilities?.Anxiety || 0;
      bucket.Depression += item?.probabilities?.Depression || 0;
      bucket.Suicidal += item?.probabilities?.Suicidal || 0;
    });

    return Array.from(buckets.values())
      .sort((a, b) => a.date - b.date)
      .map((bucket) => ({
        label: viewMode === "day" ? fmtDay(bucket.date) : fmtWeekRange(bucket.date),
        Normal: +(bucket.Normal / bucket.count).toFixed(1),
        Anxiety: +(bucket.Anxiety / bucket.count).toFixed(1),
        Depression: +(bucket.Depression / bucket.count).toFixed(1),
        Suicidal: +(bucket.Suicidal / bucket.count).toFixed(1),
      }));
  }, [history, viewMode]);

  const lineData = useMemo(
    () => ({
      labels: groupedChartData.map((item) => item.label),
      datasets: [
        {
          label: "Normal",
          data: groupedChartData.map((item) => item.Normal),
          borderColor: CATEGORY_COLORS.Normal,
          backgroundColor: `${CATEGORY_COLORS.Normal}22`,
          tension: 0.4,
          borderWidth: isMobile ? 2 : 2.5,
          pointRadius: isMobile ? 2 : 3,
          pointHoverRadius: isMobile ? 4 : 5,
        },
        {
          label: "Anxiety",
          data: groupedChartData.map((item) => item.Anxiety),
          borderColor: CATEGORY_COLORS.Anxiety,
          backgroundColor: `${CATEGORY_COLORS.Anxiety}22`,
          tension: 0.4,
          borderWidth: isMobile ? 2 : 2.5,
          pointRadius: isMobile ? 2 : 3,
          pointHoverRadius: isMobile ? 4 : 5,
        },
        {
          label: "Depression",
          data: groupedChartData.map((item) => item.Depression),
          borderColor: CATEGORY_COLORS.Depression,
          backgroundColor: `${CATEGORY_COLORS.Depression}22`,
          tension: 0.4,
          borderWidth: isMobile ? 2 : 2.5,
          pointRadius: isMobile ? 2 : 3,
          pointHoverRadius: isMobile ? 4 : 5,
        },
        {
          label: "Suicidal",
          data: groupedChartData.map((item) => item.Suicidal),
          borderColor: CATEGORY_COLORS.Suicidal,
          backgroundColor: `${CATEGORY_COLORS.Suicidal}22`,
          tension: 0.4,
          borderWidth: isMobile ? 2 : 2.5,
          pointRadius: isMobile ? 2 : 3,
          pointHoverRadius: isMobile ? 4 : 5,
        },
      ],
    }),
    [groupedChartData, isMobile],
  );

  const lineOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      // Slightly bigger touch target for tooltips on mobile
      interaction: { mode: "index", intersect: false },
      layout: {
        padding: { top: 4, right: isMobile ? 4 : 8, bottom: 0, left: isMobile ? -4 : 0 },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { family: "Inter", size: isMobile ? 10 : 12 },
            usePointStyle: true,
            boxWidth: isMobile ? 6 : 8,
            padding: isMobile ? 10 : 16,
          },
        },
        tooltip: {
          titleFont: { size: isMobile ? 11 : 12 },
          bodyFont: { size: isMobile ? 11 : 12 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: "#F1EAE0" },
          ticks: {
            font: { family: "JetBrains Mono", size: isMobile ? 9 : 11 },
            maxTicksLimit: isMobile ? 5 : 6,
          },
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "JetBrains Mono", size: isMobile ? 9 : 11 },
            maxRotation: isMobile ? 45 : 0,
            minRotation: isMobile ? 45 : 0,
            autoSkip: true,
            maxTicksLimit: isMobile ? 5 : 10,
          },
        },
      },
    }),
    [isMobile],
  );

  const pieData = useMemo(() => {
    if (!history?.length) return [];
    const total = history.length;
    const avg = { Normal: 0, Anxiety: 0, Depression: 0, Suicidal: 0 };

    history.forEach((item) => {
      avg.Normal += item?.probabilities?.Normal || 0;
      avg.Anxiety += item?.probabilities?.Anxiety || 0;
      avg.Depression += item?.probabilities?.Depression || 0;
      avg.Suicidal += item?.probabilities?.Suicidal || 0;
    });

    return Object.keys(avg).map((name) => ({
      name,
      value: +(avg[name] / total).toFixed(2),
    }));
  }, [history]);

  const doughnutData = useMemo(
    () => ({
      labels: pieData.map((item) => item.name),
      datasets: [
        {
          data: pieData.map((item) => item.value),
          backgroundColor: pieData.map((item) => CATEGORY_COLORS[item.name]),
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    }),
    [pieData],
  );

  const doughnutOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { family: "Inter", size: isMobile ? 10 : 12 },
            usePointStyle: true,
            boxWidth: isMobile ? 6 : 8,
            padding: isMobile ? 10 : 16,
          },
        },
      },
    }),
    [isMobile],
  );

  const insight = useMemo(() => {
    if (!history?.length) return "Belum ada data analisis yang tersedia.";

    const latest = history[0];
    const normal = latest?.probabilities?.Normal || 0;

    if (normal >= 60) {
      return "Kondisi menunjukkan tren yang cukup baik. Tingkat normal mendominasi hasil analisis terbaru.";
    }
    if (latest?.dominantLabel === "Depression") {
      return "Terdapat indikasi gejala depresi yang cukup dominan dibanding kategori lainnya.";
    }
    if (latest?.dominantLabel === "Anxiety") {
      return "Terdapat kecenderungan kecemasan yang cukup tinggi pada hasil analisis terbaru.";
    }
    if (latest?.dominantLabel === "Suicidal") {
      return "Terindikasi risiko tinggi. Disarankan segera berkonsultasi dengan profesional kesehatan mental.";
    }
    return "Kondisi masih fluktuatif dan memerlukan pemantauan lebih lanjut.";
  }, [history]);

  const showCrisisNote = history?.[0]?.dominantLabel === "Suicidal";

  return (
    <div
      className="min-h-screen bg-[#FAF7F3] py-6 px-3 sm:py-10 sm:px-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-num { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm border border-[#D6BFA6]/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2D2D2D]">
                Halo, {userData?.name} 👋
              </h1>
              <p className="text-[#6B7280] mt-2 text-sm">
                Pantau perkembangan kondisi mental berdasarkan hasil analisis yang pernah dilakukan.
              </p>
            </div>

            <button
              onClick={logout}
              className="w-full sm:w-auto bg-black text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl cursor-pointer hover:bg-zinc-800 hover:scale-105 transition duration-300 active:scale-100"
            >
              Keluar
            </button>
          </div>

          {/* Signature EKG divider, echoes the admin dashboard */}
          <svg viewBox="0 0 800 32" className="w-full h-6 mt-6" preserveAspectRatio="none">
            <path
              d="M0,16 L260,16 L280,3 L300,29 L320,16 L340,16 L800,16"
              fill="none"
              stroke="#B89D82"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Crisis support note — shown only when the latest result is high risk */}
        {showCrisisNote && (
          <div className="mb-6 sm:mb-8 bg-[#A34B4B]/8 border border-[#A34B4B]/25 rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
              <HeartHandshake size={18} className="text-[#A34B4B] sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="font-medium text-[#7A3737] text-sm">
                Kamu tidak sendirian
              </p>
              <p className="text-[#8A5050] text-sm mt-1 leading-relaxed">
                Hasil terbaru menunjukkan risiko yang perlu perhatian. Pertimbangkan untuk berbicara
                dengan profesional kesehatan mental, atau hubungi layanan Sejiwa di{" "}
                <span className="font-mono-num font-semibold">119 ext. 8</span> yang tersedia 24 jam.
              </p>
            </div>
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          <div className="bg-white border border-[#D6BFA6]/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D6BFA6]/15 flex items-center justify-center mb-2 sm:mb-3">
              <Brain className="text-[#B89D82] w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p className="text-[#6B7280] text-xs sm:text-sm">Total Analisis</p>
            <h2 className="font-mono-num text-2xl sm:text-3xl font-semibold text-[#2D2D2D]">{stats.total}</h2>
          </div>

          <div className="bg-white border border-[#D6BFA6]/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D6BFA6]/15 flex items-center justify-center mb-2 sm:mb-3">
              <Activity className="text-[#B89D82] w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p className="text-[#6B7280] text-xs sm:text-sm">Dominan Terakhir</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                CATEGORY_SOFT_BG[stats.dominant] || "bg-slate-100 text-slate-600"
              }`}
            >
              {stats.dominant}
            </span>
          </div>

          <div className="bg-white border border-[#D6BFA6]/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D6BFA6]/15 flex items-center justify-center mb-2 sm:mb-3">
              <TrendingUp className="text-[#B89D82] w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p className="text-[#6B7280] text-xs sm:text-sm">Rata-rata Normal</p>
            <h2
              className="font-mono-num text-xl sm:text-2xl font-semibold"
              style={{ color: CATEGORY_COLORS.Normal }}
            >
              {stats.improvement}%
            </h2>
          </div>

          <div className="bg-white border border-[#D6BFA6]/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D6BFA6]/15 flex items-center justify-center mb-2 sm:mb-3">
              <ShieldCheck className="text-[#B89D82] w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p className="text-[#6B7280] text-xs sm:text-sm">Status Saat Ini</p>
            <h2 className="font-display text-lg sm:text-xl font-semibold text-[#2D2D2D] truncate">
              {history?.[0]?.prediction || "-"}
            </h2>
          </div>
        </div>

        {/* LINE CHART */}
        <div className="bg-white border border-[#D6BFA6]/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-sm mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 px-1">
            <h2 className="font-display font-semibold text-lg sm:text-xl text-[#2D2D2D]">
              Perkembangan Kondisi
            </h2>

            {/* Day / Week toggle */}
            <div className="inline-flex bg-[#F5F0E8] rounded-xl p-1 text-xs sm:text-sm font-medium">
              <button
                onClick={() => setViewMode("day")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${
                  viewMode === "day"
                    ? "bg-white text-[#2D2D2D] shadow-sm"
                    : "text-[#8A8378] hover:text-[#2D2D2D]"
                }`}
              >
                Harian
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${
                  viewMode === "week"
                    ? "bg-white text-[#2D2D2D] shadow-sm"
                    : "text-[#8A8378] hover:text-[#2D2D2D]"
                }`}
              >
                Mingguan
              </button>
            </div>
          </div>

          {groupedChartData.length === 0 ? (
            <div className="h-[220px] sm:h-[300px] flex items-center justify-center text-[#9A968C] text-sm px-4 text-center">
              Belum ada data untuk ditampilkan.
            </div>
          ) : (
            <div className="h-[260px] sm:h-[350px] md:h-[400px] w-full">
              <Line data={lineData} options={lineOptions} />
            </div>
          )}
          <p className="text-[11px] sm:text-xs text-[#9A968C] mt-3 px-1">
            {viewMode === "day"
              ? "Setiap titik adalah rata-rata hasil analisis pada hari tersebut."
              : "Setiap titik adalah rata-rata hasil analisis pada minggu tersebut (Senin–Minggu)."}
          </p>
        </div>

        {/* PIE + INSIGHT */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          <div className="bg-white border border-[#D6BFA6]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
            <h2 className="font-display font-semibold text-lg sm:text-xl mb-4 text-[#2D2D2D]">
              Distribusi Keseluruhan
            </h2>
            <div className="h-[240px] sm:h-[300px] md:h-[320px] w-full">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F6EFE8] to-[#FFFDFB] border border-[#D6BFA6]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
            <h2 className="font-display font-semibold text-lg sm:text-xl mb-4 text-[#2D2D2D]">
              💡 Insight
            </h2>
            <p className="text-[#5B6470] leading-7 sm:leading-8 text-sm sm:text-base">{insight}</p>
          </div>
        </div>

        {/* HISTORY */}
        <div className="bg-white border border-[#D6BFA6]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
          <h2 className="font-display font-semibold text-lg sm:text-xl mb-4 sm:mb-5 text-[#2D2D2D]">
            Riwayat Analisis
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {history?.map((item) => (
              <div
                key={item.historyId}
                className="border border-[#EADFD2] rounded-2xl p-4 sm:p-5 hover:bg-[#FCFAF8] transition"
              >
                <div className="flex justify-between items-center gap-2 mb-3">
                  <span
                    className={`px-3 sm:px-4 py-1 rounded-full font-semibold text-xs sm:text-sm shrink-0 ${
                      CATEGORY_SOFT_BG[item.dominantLabel] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.dominantLabel}
                  </span>
                  <span className="font-mono-num text-xs sm:text-sm text-[#6B7280] shrink-0">
                    {item.confidence}%
                  </span>
                </div>

                <p className="text-[#4B5563] mb-4 text-sm sm:text-base break-words">{item.text}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
                  {Object.keys(CATEGORY_COLORS).map((label) => (
                    <div
                      key={label}
                      className="rounded-lg p-2 flex items-center justify-between gap-1"
                      style={{ backgroundColor: `${CATEGORY_COLORS[label]}14` }}
                    >
                      <span className="text-[#4B5563] truncate">{label}</span>
                      <span
                        className="font-mono-num font-medium shrink-0"
                        style={{ color: CATEGORY_COLORS[label] }}
                      >
                        {item.probabilities?.[label] ?? 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;