import { Link } from "@tanstack/react-router";
import { RxAvatar } from "react-icons/rx";

import { navLinks } from "../constants/navLinks";
import "../styles/header.scss";

const Header = () => {
  return (
    <header>
      <h1>Expense Tracker</h1>
      <nav>
        {navLinks.map((navLink) => {
          return (
            <Link key={navLink.id} to={navLink.to}>
              {navLink.label}
            </Link>
          );
        })}
      </nav>
      <RxAvatar size={28} />
    </header>
  );
};

export default Header;
