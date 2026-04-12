import { useCommand } from "../../context/CommandContext";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const TYPE_STYLES = {
  success: { bg: "#f0fdf4", border: "#22c55e", icon: CheckCircle, iconColor: "#22c55e" },
  error:   { bg: "#fff5f5", border: "#ef4444", icon: XCircle,     iconColor: "#ef4444" },
  info:    { bg: "#eff6ff", border: "#3b82f6", icon: Info,         iconColor: "#3b82f6" },
};

export default function ToastContainer() {
  const { toasts } = useCommand();

  return (
    <div style={{
      position: "fixed",
      bottom: 28,
      right: 28,
      zIndex: 9997,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      pointerEvents: "none",
    }}>
      {toasts.map(t => {
        const s = TYPE_STYLES[t.type] || TYPE_STYLES.success;
        const Icon = s.icon;
        return (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 18px",
            borderRadius: 14,
            background: s.bg,
            border: `1.5px solid ${s.border}40`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            maxWidth: 380,
            animation: "cmdSlideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            pointerEvents: "auto",
          }}>
            <Icon size={17} style={{ color: s.iconColor, flexShrink: 0 }} />
            <span style={{
              fontSize: 13, fontWeight: 600,
              color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1.4,
            }}>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
