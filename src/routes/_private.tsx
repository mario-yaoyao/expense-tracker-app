import { useState } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../utils/auth";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";

export const Route = createFileRoute("/_private")({
  beforeLoad: () => {
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-layout">
      <Header toggleSidebarFn={toggleSidebar} />
      <div className="layout-body">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
