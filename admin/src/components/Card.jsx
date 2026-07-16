import {
  Users,
  Activity,
  MessageSquare,
  Brain,
} from "lucide-react";

const Card = ({ title, value, icon }) => (
  <div className="bg-white border border-[#EFE7DD] rounded-3xl p-6 hover:-translate-y-1 transition shadow-sm">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-3 text-[#2F2F2F]">
          {value}
        </h2>

      </div>

      <div className="w-14 h-14 rounded-2xl bg-[#F7F2EC] flex items-center justify-center">

        {icon}

      </div>

    </div>

  </div>
);