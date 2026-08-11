import { Link } from "@tanstack/react-router";

import { navLinks } from "../../constants/navLinks";
import "../../styles/ui/sidebar.scss";

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      <nav>
        {navLinks.map((navLink) => {
          const Icon = navLink.icon;

          return (
            <Link key={navLink.id} to={navLink.to}>
              <Icon size={24} />
              {isSidebarOpen && <span>{navLink.label}</span>}{" "}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
