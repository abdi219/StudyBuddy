export function FourHome() {
  return (
    <div id="home" className="relative w-full">
      <img
        src="/4scale.jpg"
        alt="Books"
        className="w-full object-cover h-[500px] xs:h-[200px] sm:h-[500px] md:h-[550px] lg:h-[650px] xl:h-[770px] xl:-mt-15 drop-shadow-lg"
      />

      <div
        className="absolute left-1/2 transform -translate-x-1/2
                        top-30 xl:top-50
                        w-[85%] xs:w-[70%] sm:w-[70%] md:w-[75%] lg:w-[70%] xl:w-[60%]
                        h-[300px] sm:h-[300px] md:h-[370px] lg:h-[460px] xl:h-[500px]
                        p-4
                        bg-gray-200/55
                        text-black
                        rounded-[20px]
                        backdrop-blur-sm
                        flex flex-col justify-center
                       "
      >
        <h1 className="text-center mb-0.5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-2 drop-shadow-lg bg-gradient-to-r from-blue-700 via-purple-700 to-purple-500 bg-clip-text text-transparent">
          4-Scale GPA
        </h1>
        <p className="text-center mb-10 text-sm sm:text-xs md:text-sm lg:text-sm xl:text-sm bg-gradient-to-r from-blue-700 via-purple-700 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          Commonly used GPA scale in many educational institutions
        </p>

        <hr className="border-t border-gray-300 w-11/12 mx-auto my-3" />

        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl px-4">
            <div className="mx-auto flex flex-col xs:flex-col sm:flex-row gap-4 items-stretch justify-center xl: mt-2 xl:-mb-17">
              <div className="flex-1 bg-white/40 p-4 rounded-lg shadow-md text-center xl:h-45">
                <h3 className="text-lg font-semibold xl:mt-8">
                  4-Point Conversion
                </h3>
                <p className="hidden md:block text-sm text-gray-700 mt-2">
                  Quickly turn your course grades into a clean 4.0 GPA with just
                  a few inputs.
                </p>
              </div>

              <div className="flex-1 bg-white/40 p-4 rounded-lg shadow-md text-center xl:h-45">
                <h3 className="text-lg font-semibold xl:mt-8">
                  Credit-Based Score Mix
                </h3>
                <p className="hidden md:block text-sm text-gray-700 mt-2">
                  See how each course affects your GPA by balancing grades with
                  credit hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
