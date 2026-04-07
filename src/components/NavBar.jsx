import { useNavigate } from "react-router-dom";
import { ArrowRight, Library } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-white border-b border-slate-200 fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-[60px]">
        {/* Brand — identical to sidebar brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Library size={16} strokeWidth={2.2} />
          </div>
          <span className="font-semibold text-slate-800 text-[13px]">
            Abdi's Library
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {[
            { label: "Home", id: "home" },
            { label: "About", id: "description" },
            { label: "Features", id: "featuring" },
            { label: "Creator", id: "about" },
          ].map((item) => (
            <button
              key={item.id}
              className="px-3.5 py-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA — same indigo as dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-[13px] font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Dashboard
          <ArrowRight size={14} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
