export default function ClayButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 24px",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    borderRadius: "var(--radius-md)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    userSelect: "none",
    lineHeight: 1,
  };

  const variants = {
    primary: {
      background: "var(--accent)",
      color: "#ffffff",
      boxShadow: "0 2px 8px rgba(91, 91, 214, 0.25)",
    },
    secondary: {
      background: "var(--bg-surface)",
      color: "var(--text-primary)",
      border: "1.5px solid var(--border)",
      boxShadow: "var(--shadow-sm)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1.5px solid var(--border)",
    },
    danger: {
      background: "var(--danger-soft)",
      color: "var(--danger)",
      border: "1px solid #f3d0c6",
    },
  };

  return (
    <button
      style={{ ...base, ...variants[variant] }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
