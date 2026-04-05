export function SGPAHeader({ onChange }) {
  return (
    <nav className="bg-transparent text-black fixed top-0 left-0 w-full z-50">
      <div className="w-full flex flex-wrap items-center justify-between px-4 py-2">
        {/* Left side */}
        <div className="text-sm sm:text-base lg:ml-10 font-medium whitespace-nowrap">
          Abdi's Library
        </div>

        {/* Center - joined buttons */}
        <div className="inline-flex border-1 border-white/20 rounded-full overflow-hidden text-sm bg-white/20 backdrop-blur-md shadow-md mt-2 sm:mt-0">
          <button
            className="px-3 sm:px-4 py-1 hover:bg-gray-200 transition rounded-l-full"
            onClick={() => onChange("4")}
          >
            4.0 GPA
          </button>

          <button
            className="px-3 sm:px-4 py-1 hover:bg-gray-200 transition border-l border-gray-400"
            onClick={() => onChange("5")}
          >
            5.0 GPA
          </button>

          <button
            className="px-3 sm:px-4 py-1 hover:bg-gray-200 transition border-l border-gray-400 rounded-r-full"
            onClick={() => onChange("10")}
            aria-label="Scroll to About"
          >
            10 Points
          </button>
        </div>

        {/* Right side placeholder */}
        <div className="w-10 sm:w-24" />
      </div>
    </nav>
  );
}
