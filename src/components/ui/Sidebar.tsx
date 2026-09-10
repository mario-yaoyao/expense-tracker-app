import { Link } from "@tanstack/react-router";

import { getNavLinks } from "../../constants/navLinks";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/ui/sidebar.scss";

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { isSuperAdmin } = useAuth();

  const navLinks = getNavLinks(isSuperAdmin);

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      <nav>
        {navLinks.map((navLink) => {
          const Icon = navLink.icon;

          return (
            <Link key={navLink.id} to={navLink.to}>
              <Icon size={24} />
              {isSidebarOpen && <span>{navLink.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
