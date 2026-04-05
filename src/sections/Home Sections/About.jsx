export function About() {
  return (
    <section id="about" className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
          {/* Left: About text */}
          <div className="md:w-2/3">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-10">
              About me
            </h3>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Hey! I’m Abdullah, a Computer Science student from Lahore Garrison
              University. During my first semester, I had a hard time finding a
              reliable and easy-to-use GPA calculator. Most of the ones I found
              were either too complicated to use or too basic to be useful.
              That’s why I decided to create my own — a simple and
              student-friendly GPA tool that lets anyone calculate their GPA,
              SGPA, or CGPA, and even convert between different grading scales.
              My goal is to make GPA calculation quick, accurate, and accessible
              for every student.
            </p>
          </div>

          {/* Right: Profile image */}
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition ring-2 ring-transparent hover:ring-gray-500">
              <img
                src="/abdi.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
