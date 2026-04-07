import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar, { SidebarContext } from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 68 : 240;

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-base)",
        }}
        className="dot-grid"
      >
        <Sidebar />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            transition: "margin-left 0.3s ease",
            marginLeft: sidebarWidth,
          }}
        >
          <TopBar />
          <main
            style={{
              flex: 1,
              padding: "28px 32px",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
