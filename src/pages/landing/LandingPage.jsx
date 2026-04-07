import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Repeat,
  Scale,
  BookOpenCheck,
  Blocks,
  Timer,
  Sparkles,
  Library,
} from "lucide-react";

/* ─── Inline styles (no Tailwind dependency for layout precision) ─── */
const styles = {
  /* ── NAV ── */
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid var(--border-light)",
    background: "rgba(250, 249, 246, 0.88)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  },
  navInner: {
    width: "100%",
    maxWidth: 1200,
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  navBrandIcon: {
    width: 36,
    height: 36,
    borderRadius: "var(--radius-sm)",
    background: "var(--accent)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navBrandText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: 15,
    color: "var(--text-primary)",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  navCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 20px",
    background: "var(--accent)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    borderRadius: "var(--radius-sm)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  /* ── HERO ── */
  hero: {
    paddingTop: 140,
    paddingBottom: 80,
    position: "relative",
  },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    gap: 64,
    flexWrap: "wrap",
  },
  heroContent: {
    flex: "1 1 500px",
    minWidth: 0,
  },
  heroImageWrap: {
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "center",
  },
  heroImageRing: {
    width: 220,
    height: 220,
    borderRadius: "50%",
    padding: 5,
    border: "3px dashed var(--doodle-strong)",
    background: "var(--accent-soft)",
    animation: "doodleFloat 6s ease-in-out infinite",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 16px",
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    borderRadius: "var(--radius-full)",
    background: "var(--accent-soft)",
    color: "var(--accent)",
    border: "1px solid var(--border-accent)",
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 700,
    lineHeight: 1.15,
    color: "var(--text-primary)",
    marginBottom: 20,
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "-0.03em",
  },
  heroSubtitle: {
    fontSize: 17,
    lineHeight: 1.7,
    color: "var(--text-secondary)",
    maxWidth: 520,
    marginBottom: 36,
  },
  heroBtns: {
    display: "flex",
    flexWrap: "wrap",
    gap: 14,
  },

  /* ── SECTION SHARED ── */
  sectionHeader: {
    marginBottom: 48,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--accent)",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: "clamp(24px, 3vw, 36px)",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: 12,
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "-0.02em",
  },
  sectionDesc: {
    fontSize: 15,
    lineHeight: 1.75,
    color: "var(--text-secondary)",
    maxWidth: 600,
  },

  /* ── FEATURE CARD ── */
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
  },
  featureCard: {
    background: "var(--bg-surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: 28,
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  featureIconBox: {
    width: 48,
    height: 48,
    borderRadius: "var(--radius-md)",
    background: "var(--accent-soft)",
    border: "1.5px solid var(--border-accent)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--accent)",
    marginBottom: 20,
    transition: "all 0.25s ease",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 8,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  featureDesc: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "var(--text-muted)",
  },
  featureArrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    color: "var(--accent)",
    marginTop: 16,
    opacity: 0,
    transform: "translateX(-8px)",
    transition: "all 0.25s ease",
  },

  /* ── DESCRIPTION SECTION ── */
  descGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },
  descCard: {
    background: "var(--bg-surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: 28,
    transition: "all 0.3s ease",
    position: "relative",
  },
  descCardIcon: {
    width: 40,
    height: 40,
    borderRadius: "var(--radius-sm)",
    background: "var(--accent-soft)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--accent)",
    marginBottom: 16,
  },
  descCardTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 8,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  descCardText: {
    fontSize: 13,
    lineHeight: 1.7,
    color: "var(--text-muted)",
  },

  /* ── ABOUT SECTION ── */
  aboutGrid: {
    display: "flex",
    alignItems: "center",
    gap: 48,
    flexWrap: "wrap",
  },
  aboutContent: {
    flex: "1 1 400px",
    minWidth: 0,
  },
  aboutImageSide: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  aboutImageRing: {
    width: 200,
    height: 200,
    borderRadius: 20,
    padding: 4,
    border: "2.5px dashed var(--border-accent)",
    background: "var(--accent-soft)",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  aboutImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    objectFit: "cover",
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 1.8,
    color: "var(--text-secondary)",
    marginBottom: 16,
  },
  aboutName: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--text-primary)",
  },
  aboutRole: {
    fontSize: 12,
    color: "var(--text-muted)",
    marginTop: 4,
  },

  /* ── FOOTER ── */
  footer: {
    borderTop: "1px solid var(--border)",
    padding: "32px 24px",
    textAlign: "center",
    background: "var(--bg-surface)",
  },
  footerText: {
    fontSize: 13,
    color: "var(--text-muted)",
  },

  /* ── DOODLE DECORATIONS ── */
  doodleCircle1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: "50%",
    border: "2.5px dashed var(--doodle-color)",
    right: -40,
    top: 200,
    pointerEvents: "none",
    animation: "doodleFloat 8s ease-in-out infinite",
  },
  doodleCircle2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "2px dashed var(--doodle-color)",
    left: -30,
    bottom: 100,
    pointerEvents: "none",
    animation: "doodleFloat 10s ease-in-out infinite",
    animationDelay: "2s",
  },
  doodleStar1: {
    position: "absolute",
    right: 80,
    top: 140,
    fontSize: 20,
    color: "var(--accent)",
    opacity: 0.12,
    pointerEvents: "none",
    animation: "doodleFloat 7s ease-in-out infinite",
  },
  doodleStar2: {
    position: "absolute",
    left: 60,
    top: 250,
    fontSize: 16,
    color: "var(--accent)",
    opacity: 0.1,
    pointerEvents: "none",
    animation: "doodleFloat 9s ease-in-out infinite",
    animationDelay: "1.5s",
  },
  doodleStar3: {
    position: "absolute",
    right: 200,
    bottom: 50,
    fontSize: 22,
    color: "var(--accent)",
    opacity: 0.08,
    pointerEvents: "none",
    animation: "doodleFloat 11s ease-in-out infinite",
    animationDelay: "3s",
  },
  doodlePlus: {
    position: "absolute",
    fontSize: 28,
    color: "var(--accent)",
    opacity: 0.08,
    pointerEvents: "none",
  },
};

/* ─── Data ─── */
const features = [
  {
    icon: GraduationCap,
    title: "GPA Analyzer",
    desc: "Calculate semester and overall GPA with real-time updates. Supports weighted averages and multi-scale grading systems.",
    to: "/gpa",
  },
  {
    icon: Repeat,
    title: "ScaleFlex",
    desc: "Switch dynamically between 4.0, 5.0, and 10.0 grading scales. See how your grades translate across systems.",
    to: "/gpa/calculate",
  },
  {
    icon: Scale,
    title: "Convertify",
    desc: "Smart GPA converter for global compatibility. Perfect for scholarship applications and studying abroad.",
    to: "/gpa",
  },
];

const highlights = [
  {
    icon: BookOpenCheck,
    title: "Multi-Scale Support",
    text: "Calculate your CGPA on 4.0, 5.0, and 10.0 scales with instant, accurate results.",
  },
  {
    icon: Blocks,
    title: "Conversion Tools",
    text: "See exactly how your 10-scale GPA compares to a 4-scale or 5-scale system.",
  },
  {
    icon: Timer,
    title: "Strategic Planning",
    text: "Plan your semesters, track progress, and make informed decisions with clear grading rules.",
  },
];

const navLinks = [
  { label: "Home", id: "hero" },
  { label: "About", id: "description" },
  { label: "Features", id: "features" },
  { label: "Creator", id: "about" },
];

/* ─── Helper: smooth scroll ─── */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ═══════════════════════════════════════
   LANDING PAGE COMPONENT
   ═══════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* ── NAVBAR ── */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <div style={styles.navBrandIcon}>
              <Library size={18} strokeWidth={2.2} />
            </div>
            <span style={styles.navBrandText}>Abdi's Library</span>
          </div>

          <div style={{ ...styles.navLinks, display: "none" }} className="sm-flex">
            {navLinks.map((item) => (
              <button
                key={item.id}
                className="nav-link"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link to="/dashboard" style={styles.navCta} className="btn-primary">
            Dashboard <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section id="hero" style={styles.hero} className="doodle-bg">
        {/* Doodle decorations */}
        <div style={styles.doodleStar1}>✦</div>
        <div style={styles.doodleStar2}>✦</div>
        <div style={{ ...styles.doodlePlus, right: 120, top: 300 }}>+</div>
        <div style={{ ...styles.doodlePlus, left: 100, bottom: 40 }}>+</div>

        <div style={styles.heroInner} className="stagger">
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <Sparkles size={14} />
              Student Productivity Platform
            </div>

            <h1 style={styles.heroTitle}>
              Track your academic<br />
              progress with{" "}
              <span style={{ color: "var(--accent)" }}>clarity</span>
            </h1>

            <p style={styles.heroSubtitle}>
              Calculate GPA across multiple scales, manage study sessions,
              and stay on top of your performance — all in one clean, student-focused workspace.
            </p>

            <div style={styles.heroBtns}>
              <Link to="/dashboard" className="btn btn-primary">
                Open Dashboard <ArrowRight size={15} />
              </Link>
              <Link to="/gpa/calculate" className="btn btn-secondary">
                Try Calculator
              </Link>
            </div>
          </div>

          <div style={styles.heroImageWrap}>
            <div style={styles.heroImageRing}>
              <img
                src="/abdi.jpg"
                alt="Abdullah Faisal"
                style={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION / WHY SECTION ── */}
      <section id="description" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)" }}>
        <div className="page-container section-spacing">
          <div style={styles.sectionHeader}>
            <p style={styles.sectionLabel}>Why Abdi's Library?</p>
            <h2 style={styles.sectionTitle}>
              Built for students who value simplicity
            </h2>
            <p style={styles.sectionDesc}>
              Managing your grades and tracking your academic performance has never been easier.
              Whether you're aiming for top marks or planning your next move, our platform simplifies your life.
            </p>
          </div>

          <div style={styles.descGrid} className="stagger">
            {highlights.map((item) => (
              <div
                key={item.title}
                style={styles.descCard}
                className="surface-lift"
              >
                <div style={styles.descCardIcon}>
                  <item.icon size={18} strokeWidth={1.8} />
                </div>
                <h3 style={styles.descCardTitle}>{item.title}</h3>
                <p style={styles.descCardText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="notebook-bg" style={{ borderTop: "1px solid var(--border-light)" }}>
        <div className="page-container section-spacing">
          <div style={styles.sectionHeader}>
            <p style={styles.sectionLabel}>Featured Tools</p>
            <h2 style={styles.sectionTitle}>
              Powerful tools, zero complexity
            </h2>
            <p style={styles.sectionDesc}>
              Helping students work smarter, not harder. Each tool is designed to be intuitive, accurate, and fast.
            </p>
          </div>

          <div style={styles.featureGrid} className="stagger">
            {features.map((f) => (
              <Link
                key={f.title}
                to={f.to}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={styles.featureCard}
                  className="card-interactive"
                  onMouseEnter={(e) => {
                    const arrow = e.currentTarget.querySelector(".feat-arrow");
                    const icon = e.currentTarget.querySelector(".feat-icon");
                    if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translateX(0)"; }
                    if (icon) { icon.style.transform = "rotate(-4deg) scale(1.08)"; icon.style.background = "var(--accent-muted)"; icon.style.borderColor = "var(--accent)"; }
                  }}
                  onMouseLeave={(e) => {
                    const arrow = e.currentTarget.querySelector(".feat-arrow");
                    const icon = e.currentTarget.querySelector(".feat-icon");
                    if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "translateX(-8px)"; }
                    if (icon) { icon.style.transform = "none"; icon.style.background = "var(--accent-soft)"; icon.style.borderColor = "var(--border-accent)"; }
                  }}
                >
                  <div style={styles.featureIconBox} className="feat-icon">
                    <f.icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 style={styles.featureTitle}>{f.title}</h3>
                  <p style={styles.featureDesc}>{f.desc}</p>
                  <span style={styles.featureArrow} className="feat-arrow">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / CREATOR SECTION ── */}
      <section id="about" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)" }}>
        <div className="page-container section-spacing">
          <div style={styles.sectionHeader}>
            <p style={styles.sectionLabel}>Meet the Creator</p>
            <h2 style={styles.sectionTitle}>Built by a student, for students</h2>
          </div>

          <div
            style={{
              background: "var(--bg-base)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: "40px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div style={styles.aboutGrid}>
              <div style={styles.aboutContent}>
                <p style={styles.aboutText}>
                  Hey! I'm <strong>Abdullah</strong>, a Computer Science student from Lahore Garrison University.
                  During my first semester, I had a hard time finding a reliable
                  and easy-to-use GPA calculator. Most of the ones I found were either too complicated or too basic.
                </p>
                <p style={styles.aboutText}>
                  That's why I decided to create my own — a simple and student-friendly productivity tool
                  that lets anyone calculate their GPA, SGPA, or CGPA, manage study sessions,
                  and even convert between different grading scales.
                </p>
                <p style={{ ...styles.aboutText, marginBottom: 0, color: "var(--accent)", fontWeight: 500 }}>
                  My goal is to make academic tracking quick, accurate, and accessible for every student.
                </p>
              </div>

              <div style={styles.aboutImageSide}>
                <div style={styles.aboutImageRing}>
                  <img
                    src="/abdi.jpg"
                    alt="Abdullah Faisal"
                    style={styles.aboutImage}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={styles.aboutName}>Abdullah Faisal</p>
                  <p style={styles.aboutRole}>CS Student · LGU Lahore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} Abdi's Library — Built for students, by a student.
        </p>
      </footer>

      {/* ── INLINE CSS FOR NAV RESPONSIVENESS ── */}
      <style>{`
        @media (min-width: 640px) {
          .sm-flex { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
