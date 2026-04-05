import { useNavigate } from "react-router-dom";

export function Featuring() {
  const navigate = useNavigate();
  return (
    <div id="featuring" className="relative w-full">
      <img
        src="/grad.jpg"
        alt="Books"
        className="w-full h-auto object-cover  drop-shadow-lg shadow-[0_-15px_15px_rgba(0,0,0,0.1)]"
      />

      <div
        className="absolute 
             top-1/2 left-1/2 
             transform -translate-x-1/2 -translate-y-1/2
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
        <div className="flex flex-col justify-center items-center ">
          <h1 className="ml-10 mb-0.5 5text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold pb-2 drop-shadow-lg bg-gradient-to-r from-blue-700 via-purple-700 to-purple-500 bg-clip-text text-transparent">
            Featuring Some Tools
          </h1>
          <p className="ml-10 mb-10 text-sm sm:text-xs md:text-sm lg:text-sm xl:text-sm bg-gradient-to-r from-blue-700 via-purple-700 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Helping the young generation to make it easy
          </p>
        </div>

        {/* Divider and three info blocks (centered) */}
        <hr className="border-t border-gray-300 w-11/12 mx-auto my-3 mb-5 mt4" />

        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl px-4">
            <div className="mx-auto flex flex-col xs:flex-col sm:flex-row gap-4 items-stretch justify-center">
              <div
                className="flex-1 bg-white/40 p-4 rounded-lg shadow-md text-center cursor-pointer transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                role="button"
                tabIndex={0}
              >
                <h3 className="text-lg font-semibold"> GPA Analyzer</h3>
                <p className="hidden md:block text-sm text-gray-700 mt-2">
                  Calculates semester and overall GPA with real-time updates and
                  weighted averages.
                </p>
              </div>

              <div
                className="flex-1 bg-white/40 p-4 rounded-lg shadow-md text-center cursor-pointer transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                role="button"
                tabIndex={0}
                onClick={() => navigate("/sgpa")}
                onKeyDown={(e) => e.key === "Enter" && navigate("/sgpa")}
              >
                <h3 className="text-lg font-semibold">ScaleFlex</h3>
                <p className="hidden md:block text-sm text-gray-700 mt-2">
                  A dynamic grading system switcher supporting 4.0, 5.0, and
                  10.0 GPA scales.
                </p>
              </div>

              <div
                className="flex-1 bg-white/40 p-4 rounded-lg shadow-md text-center cursor-pointer transform transition duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
                role="button"
                tabIndex={0}
              >
                <h3 className="text-lg font-semibold">Convertify</h3>
                <p className="hidden md:block text-sm text-gray-700 mt-2">
                  A smart converter that translates GPAs between different
                  grading scales for global compatibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
