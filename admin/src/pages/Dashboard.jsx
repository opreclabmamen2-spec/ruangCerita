import { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

import { Doughnut, Bar } from "react-chartjs-2";

import {
  Users,
  Brain,
  CircleHelp,
  Activity,
  TrendingUp,
  Target,
  CalendarDays,
} from "lucide-react";

const CATEGORY_COLORS = {
  Anxiety: "#D9A441",
  Depression: "#6B7FA3",
  Normal: "#3B8C7E",
  Suicidal: "#A34B4B",
};

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    if (chart.config.type !== "doughnut") return;
    const { ctx, chartArea } = chart;
    const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    const cx = (chartArea.left + chartArea.right) / 2;
    const cy = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#0F172A";
    ctx.font = "700 28px 'JetBrains Mono', monospace";
    ctx.fillText(total.toLocaleString(), cx, cy - 8);
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillStyle = "#64748B";
    ctx.fillText("total deteksi", cx, cy + 16);
    ctx.restore();
  },
};
ChartJS.register(centerTextPlugin);

const Dashboard = () => {
  const { dashboardData, getDashboardData } = useContext(AdminContext);

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#F5F7F6] flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#2F6F62] border-t-transparent animate-spin" />
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            Memuat dashboard...
          </p>
        </div>
      </div>
    );
  }

  const { statistics } = dashboardData;

  const data = {
    labels: ["Anxiety", "Depression", "Normal", "Suicidal"],
    datasets: [
      {
        data: [
          statistics.Anxiety,
          statistics.Depression,
          statistics.Normal,
          statistics.Suicidal,
        ],
        backgroundColor: Object.values(CATEGORY_COLORS),
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const barData = {
    labels: ["Anxiety", "Depression", "Normal", "Suicidal"],
    datasets: [
      {
        label: "Predictions",
        data: [
          statistics.Anxiety,
          statistics.Depression,
          statistics.Normal,
          statistics.Suicidal,
        ],
        backgroundColor: Object.values(CATEGORY_COLORS),
        borderRadius: 8,
        maxBarThickness: 56,
      },
    ],
  };

  const total =
    statistics.Anxiety +
    statistics.Depression +
    statistics.Normal +
    statistics.Suicidal;

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="min-h-screen bg-slate-50 p-6 md:p-10"
      style={{ fontFamily: "Inter, sans-serif" }}
    >


      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B8C7E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F6F62]"></span>
              </span>
              <span className="text-xs font-medium tracking-wider uppercase text-[#2F6F62]">
                Live overview
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-slate-800">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1 text-sm">{today}</p>
          </div>
        </div>

        {/* Signature: EKG divider */}
        <svg
          viewBox="0 0 800 40"
          className="w-full h-8 mt-6"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 L260,20 L280,4 L300,36 L320,20 L340,20 L800,20"
            fill="none"
            stroke="#2F6F62"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            className="pulse-path"
          />
        </svg>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card
          title="Total Pengguna"
          value={dashboardData.totalUsers}
          accent="#2F6F62"
          icon={<Users size={20} />}
        />
        <Card
          title="Total Deteksi"
          value={dashboardData.totalDetection}
          accent="#D9A441"
          icon={<Brain size={20} />}
        />
        <Card
          title="Total FAQ"
          value={dashboardData.totalFAQ}
          accent="#3B8C7E"
          icon={<CircleHelp size={20} />}
        />
        <Card
          title="Total Kategori"
          value={dashboardData.totalCategories}
          accent="#6B7FA3"
          icon={<Activity size={20} />}
        />
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-5 gap-6 mt-8">
        {/* Doughnut */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
          <h2 className="font-display text-lg font-semibold text-slate-800 mb-6">
            Distribusi Deteksi
          </h2>
          <div className="w-full max-w-[260px] mx-auto">
            <Doughnut
              data={data}
              options={{
                cutout: "74%",
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-7">
            {Object.entries(CATEGORY_COLORS).map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-slate-500">{label}</span>
                <span className="font-mono-num text-xs font-medium text-slate-700 ml-auto">
                  {statistics[label]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
          <h2 className="font-display text-lg font-semibold text-slate-800 mb-6">
            AI Insights
          </h2>

          <div className="space-y-3">
            <InsightCard
              title="Kategori Terbanyak"
              value={dashboardData.mostDetected.label}
              subtitle={`${dashboardData.mostDetected.total} deteksi`}
              icon={<Brain size={18} />}
              accent="#D9A441"
            />
            <InsightCard
              title="Tingkat Penggunaan"
              value={`${dashboardData.detectionRate}%`}
              subtitle="Pengguna yang melakukan deteksi"
              icon={<TrendingUp size={18} />}
              accent="#2F6F62"
            />
            <InsightCard
              title="Rata-rata Kepercayaan"
              value={`${dashboardData.averageConfidence}%`}
              subtitle="Tingkat keyakinan model AI"
              icon={<Target size={18} />}
              accent="#3B8C7E"
            />
            <InsightCard
              title="Deteksi Hari Ini"
              value={dashboardData.detectionToday}
              subtitle="Jumlah deteksi hari ini"
              icon={<CalendarDays size={18} />}
              accent="#6B7FA3"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mt-6">
        {/* Bar chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
          <h2 className="font-display text-lg font-semibold text-slate-800 mb-6">
            Perbandingan Deteksi
          </h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false } },
                y: {
                  grid: { color: "#F1F5F9" },
                  ticks: { font: { family: "JetBrains Mono", size: 11 } },
                },
              },
            }}
          />
        </div>

        {/* Statistics */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
          <h2 className="font-display text-lg font-semibold text-slate-800 mb-6">
            Statistik Deteksi
          </h2>

          <Stat
            title="Anxiety"
            value={statistics.Anxiety}
            total={total}
            color={CATEGORY_COLORS.Anxiety}
          />
          <Stat
            title="Depression"
            value={statistics.Depression}
            total={total}
            color={CATEGORY_COLORS.Depression}
          />
          <Stat
            title="Normal"
            value={statistics.Normal}
            total={total}
            color={CATEGORY_COLORS.Normal}
          />
          <Stat
            title="Suicidal"
            value={statistics.Suicidal}
            total={total}
            color={CATEGORY_COLORS.Suicidal}
            last
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, accent, icon }) => (
  <div className="relative bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
    <span
      className="absolute top-0 left-0 w-full h-[3px]"
      style={{ backgroundColor: accent }}
    />
    <div className="flex items-center justify-between mb-4">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        {icon}
      </div>
    </div>
    <p className="text-slate-500 text-xs font-medium">{title}</p>
    <h2 className="font-mono-num text-3xl font-semibold mt-1 text-slate-800">
      {value}
    </h2>
  </div>
);

const Stat = ({ title, value, total, color, last }) => {
  const percent = total === 0 ? 0 : (value / total) * 100;

  return (
    <div className={last ? "" : "mb-6"}>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-medium text-slate-600">{title}</span>
        <span className="font-mono-num text-sm font-semibold text-slate-800">
          {value}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const InsightCard = ({ icon, title, value, subtitle, accent }) => {
  return (
    <div className="flex items-center gap-4 border border-slate-100 rounded-xl p-4 hover:border-slate-200 hover:bg-slate-50/50 transition">
      <span
        className="w-1 self-stretch rounded-full shrink-0"
        style={{ backgroundColor: accent }}
      />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{title}</p>
        <h2 className="font-display font-semibold text-xl text-slate-800 truncate">
          {value}
        </h2>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default Dashboard;