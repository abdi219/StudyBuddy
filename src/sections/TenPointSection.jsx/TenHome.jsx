export function TenHome() {
  return (
    <div id="home" className="relative w-full">
      <img
        src="/TenHome.png"
        alt="Books"
        className="w-full object-cover h-[400px] xs:h-[200px] sm:h-[500px] md:h-[550px] lg:h-[650px] xl:h-[770px] xl:-mt-15 drop-shadow-lg"
      />

      {/* Responsive overlay card: sizes and offsets change per breakpoint */}
      <div
        className="absolute left-8
                        sm:left-10 md:left-8 lg:left-15
                        top-30 xl:top-50
                        w-[85%] xs:w-[70%] sm:w-[70%] md:w-[75%] lg:w-[70%] xl:w-[60%]
                        h-[200px] sm:h-[300px] md:h-[370px] lg:h-[460px] xl:h-[500px]
                        p-4
                        bg-gray-200/55
                        text-black
                        rounded-[20px]
                        backdrop-blur-sm
                        flex flex-col justify-center
                       "
      >
        <h1 className="ml-10 mb-0.5 5text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-2 drop-shadow-lg bg-gradient-to-r from-blue-700 via-purple-700 to-purple-500 bg-clip-text text-transparent">
          Student Management
        </h1>
        <p className="ml-10 mb-10 text-sm sm:text-xs md:text-sm lg:text-sm xl:text-sm bg-gradient-to-r from-blue-700 via-purple-700 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Track your academic progress in seconds
        </p>
        {/* Divider and three info blocks (centered) */}
        <hr className="border-t border-gray-300 w-11/12 mx-auto my-3" />

        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl px-4">
            <div className="mx-auto flex flex-col xs:flex-col sm:flex-row gap-4 items-stretch justify-center">
              <div className="flex-1 bg-white/40 p-4 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Credit Hours</h3>
                <p className="hidden md:block text-sm text-gray-700 mt-2">
                  Track total and per-course credit hours used in GPA
                  calculation.
                </p>
              </div>

              <div className="flex-1 bg-white/40 p-4 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Weighted Average</h3>
                <p className="hidden md:block text-sm text-gray-700 mt-2">
                  Compute GPA using credit-weighted averages so larger courses
                  carry more weight.
                </p>
              </div>

              <div className="flex-1 bg-white/40 p-4 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Scaled Mapping</h3>
                <p className="hidden md:block text-sm text-gray-700 mt-2">
                  Map raw scores to grade points with configurable grading
                  scales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
