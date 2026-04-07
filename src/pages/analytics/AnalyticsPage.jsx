import { Clock, Calendar, BookOpen, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Study Time",
    value: "48.5h",
    sub: "This month",
    icon: Clock,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Sessions",
    value: "24",
    sub: "This month",
    icon: Calendar,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Subjects Covered",
    value: "6",
    sub: "Active subjects",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Avg. Session",
    value: "2.0h",
    sub: "Per session",
    icon: TrendingUp,
    color: "bg-rose-50 text-rose-600",
  },
];

const sessions = [
  { subject: "Data Structures", duration: "1h 15m", date: "Today", score: "A" },
  { subject: "OOP Concepts", duration: "45m", date: "Yesterday", score: "B+" },
  { subject: "Linear Algebra", duration: "2h", date: "Apr 2", score: "A-" },
  {
    subject: "Database Systems",
    duration: "1h 30m",
    date: "Apr 1",
    score: "B",
  },
  { subject: "Algorithms", duration: "55m", date: "Mar 30", score: "A" },
];

const weekly = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.0 },
  { day: "Wed", hours: 3.0 },
  { day: "Thu", hours: 0.5 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 4.0 },
  { day: "Sun", hours: 1.5 },
];
const maxH = Math.max(...weekly.map((d) => d.hours));

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-5xl fade-enter">
      <div>
        <h1 className="text-2xl font-bold text-[#1f2430]">Analytics</h1>
        <p className="text-sm text-[#626a7c] mt-0.5">
          Track your study habits and academic performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {stats.map((s) => (
          <div key={s.title} className="card p-4 surface-lift">
            <div className="flex items-start justify-between mb-3">
              <p className="text-[11px] font-semibold text-[#7d8598] uppercase tracking-wider">
                {s.title}
              </p>
              <div className="w-9 h-9 rounded-xl border border-[#dbe0ea] bg-white text-[#32405a] flex items-center justify-center">
                <s.icon size={16} strokeWidth={1.8} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#1f2430]">{s.value}</p>
            <p className="text-[11px] text-[#7f8799] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart */}
        <div className="card p-5">
          <h3 className="text-[13px] font-semibold text-[#2f374a] mb-4">
            Weekly Study Hours
          </h3>
          <div
            className="flex items-end justify-between gap-2"
            style={{ height: 140 }}
          >
            {weekly.map((d) => (
              <div
                key={d.day}
                className="flex flex-col items-center gap-1.5 flex-1"
              >
                <span className="text-[10px] font-medium text-[#6d7588]">
                  {d.hours}h
                </span>
                <div
                  className="w-full rounded-t-md bg-[#2f456d] transition-all duration-500"
                  style={{
                    height: `${(d.hours / maxH) * 100}%`,
                    minHeight: 4,
                    opacity: 0.5 + (d.hours / maxH) * 0.5,
                  }}
                />
                <span className="text-[10px] font-medium text-[#858ca0]">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* GPA trend placeholder */}
        <div className="card p-5">
          <h3 className="text-[13px] font-semibold text-[#2f374a] mb-4">
            GPA Trend
          </h3>
          <div
            className="flex items-center justify-center"
            style={{ height: 140 }}
          >
            <div className="text-center">
              <TrendingUp size={24} className="text-[#9ca4b5] mx-auto mb-2" />
              <p className="text-xs text-[#7f8799]">
                GPA trend chart will appear after more data is recorded.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Session history */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-[#e7eaf1]">
          <h3 className="text-[13px] font-semibold text-[#2f374a]">
            Session History
          </h3>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#e7eaf1]">
              <th className="text-left px-4 py-2.5 font-medium text-[#7f8799] text-[10px] uppercase tracking-wider">
                Subject
              </th>
              <th className="text-left px-4 py-2.5 font-medium text-[#7f8799] text-[10px] uppercase tracking-wider">
                Duration
              </th>
              <th className="text-left px-4 py-2.5 font-medium text-[#7f8799] text-[10px] uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-4 py-2.5 font-medium text-[#7f8799] text-[10px] uppercase tracking-wider">
                Performance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eceff4]">
            {sessions.map((s, i) => (
              <tr key={i} className="hover:bg-[#f7f8fb] transition-colors">
                <td className="px-4 py-2.5 font-medium text-[#2f374a]">
                  {s.subject}
                </td>
                <td className="px-4 py-2.5 text-[#656d81]">{s.duration}</td>
                <td className="px-4 py-2.5 text-[#656d81]">{s.date}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#e6eefc] text-[#2a4066]">
                    {s.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
