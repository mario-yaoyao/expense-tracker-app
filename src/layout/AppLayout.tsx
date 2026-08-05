import { Outlet } from "@tanstack/react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/appLayout.scss";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <div className="layout-body">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
