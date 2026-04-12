import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar, { SidebarContext } from "./Sidebar";
import StudentDoodles from "../ui/StudentDoodles";
import CommandBar from "../ui/CommandBar";
import ToastContainer from "../ui/ToastContainer";
import { CommandProvider } from "../../context/CommandContext";

function DashboardInner() {
  const [collapsed, setCollapsed] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  // ── Global Ctrl+K / Cmd+K hotkey ──
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, openCmd: () => setCmdOpen(true) }}>
      <div style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        position: "relative",
      }}>
        {/* Floating background doodles */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <StudentDoodles count={35} opacity={0.12} seed={808} color="var(--text-primary)" />
          <StudentDoodles count={15} opacity={0.08} seed={909} color="var(--accent)" />
        </div>

        {/* Sidebar / nav */}
        <Sidebar />

        {/* Main content */}
        <main style={{
          padding: "40px 40px 100px",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}>
          <Outlet />
        </main>

        {/* Global command bar (Ctrl+K) */}
        {cmdOpen && <CommandBar onClose={() => setCmdOpen(false)} />}

        {/* Toast notifications */}
        <ToastContainer />
      </div>
    </SidebarContext.Provider>
  );
}

export default function DashboardLayout() {
  return (
    <CommandProvider>
      <DashboardInner />
    </CommandProvider>
  );
}
