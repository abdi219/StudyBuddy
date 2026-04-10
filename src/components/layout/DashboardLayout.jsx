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
        {/* Floating background doodles covering entire app */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <StudentDoodles count={35} opacity={0.12} seed={808} color="var(--text-primary)" />
          <StudentDoodles count={15} opacity={0.08} seed={909} color="var(--accent)" />
        </div>

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
