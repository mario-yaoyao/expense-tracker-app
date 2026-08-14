import { useEffect, useState } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getProfileAsync } from "../api/profile";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
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
  const { accessToken } = useAuth();
  const { setProfile, clearProfile } = useProfile();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const initialize = async () => {
      if (!accessToken) return;

      try {
        const profile = await getProfileAsync();
        setProfile(profile.data);
      } catch {
        clearProfile();
      }
    };
    initialize();
  }, [accessToken, setProfile, clearProfile]);

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
