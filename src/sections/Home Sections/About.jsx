export function About() {
  return (
    <section id="about" className="bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="card p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          {/* Text */}
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
              About the Creator
            </h2>
            <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
              Hey! I'm Abdullah, a Computer Science student from Lahore Garrison
              University. During my first semester, I had a hard time finding a
              reliable and easy-to-use GPA calculator. Most of the ones I found
              were either too complicated or too basic. That's why I decided to
              create my own — a simple and student-friendly productivity tool that
              lets anyone calculate their GPA, SGPA, or CGPA, manage study
              sessions, and even convert between different grading scales. My goal
              is to make academic tracking quick, accurate, and accessible for
              every student.
            </p>
          </div>
          {/* Profile */}
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-slate-200">
              <img
                src="/abdi.jpg"
                alt="Abdullah Faisal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Abdi's Library — Built for students, by a student.
          </p>
        </div>
      </div>
    </section>
  );
}
