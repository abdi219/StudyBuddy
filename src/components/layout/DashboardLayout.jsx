import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar, { SidebarContext } from "./Sidebar";
import StudentDoodles from "../ui/StudentDoodles";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        position: "relative",
      }}>
        {/* Floating black doodles in background */}
        <StudentDoodles count={16} opacity={0.15} seed={12} color="#1a1a2e" />

        {/* Top nav bar (replaces left sidebar) */}
        <Sidebar />

        {/* Main content — no left margin needed */}
        <main style={{
          padding: "40px 40px 100px",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}>
          <Outlet />
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
