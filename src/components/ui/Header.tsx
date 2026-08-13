import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import Confirmation from "./Confirmation";
import "../../styles/ui/header.scss";

const Header = ({ toggleSidebarFn }: { toggleSidebarFn: () => void }) => {
  const router = useRouter();
  const { clearTokens } = useAuth.getState();

  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] =
    useState(false);

  const openLogoutConfirmation = () => setIsLogoutConfirmationOpen(true);
  const closeLogoutConfirmation = () => setIsLogoutConfirmationOpen(false);

  const logout = async () => {
    clearTokens();
    router.invalidate();
    toast.success(`Logged out successfully`);
  };

  return (
    <header>
      <div className="header-wrapper">
        <FiMenu size={24} onClick={toggleSidebarFn} />
        <h1>Expense Tracker</h1>
      </div>
      <button onClick={openLogoutConfirmation}>
        <RxAvatar size={30} />
      </button>
      <Confirmation
        isOpen={isLogoutConfirmationOpen}
        description="Are you sure you want to log out?"
        onSubmitFn={logout}
        onClose={closeLogoutConfirmation}
      />
    </header>
  );
};

export default Header;
