export default function TabBar({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) {
  return (
    <div
      className={`inline-flex items-center rounded-xl border border-[#d7dce6] bg-[#fbfaf6] p-1 gap-1 ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap ${
            activeTab === tab.value
              ? "bg-[#1f2430] text-white"
              : "text-[#5d6577] hover:bg-white hover:text-[#2a3142]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
