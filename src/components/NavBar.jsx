const NavBar = () => {
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
            onClick={() =>
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to Home"
          >
            Home
          </button>

          <button
            className="px-3 sm:px-4 py-1 hover:bg-gray-200 transition border-l border-gray-400"
            onClick={() =>
              document
                .getElementById("description")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to Description"
          >
            Description
          </button>

          <button
            className="px-3 sm:px-4 py-1 hover:bg-gray-200 transition border-l border-gray-400"
            onClick={() =>
              document
                .getElementById("featuring")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to Featuring"
          >
            Featuring
          </button>

          <button
            className="px-3 sm:px-4 py-1 hover:bg-gray-200 transition border-l border-gray-400 rounded-r-full"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to About"
          >
            About Me
          </button>
        </div>

        {/* Right side placeholder */}
        <div className="w-10 sm:w-24" />
      </div>
    </nav>
  );
};

export default NavBar;
