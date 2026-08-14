import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import Confirmation from "./Confirmation";
import ProfileMenu from "../Profile/ProfileMenu";
import Popover from "./Popover";
import "../../styles/ui/header.scss";

const Header = ({ toggleSidebarFn }: { toggleSidebarFn: () => void }) => {
  const router = useRouter();
  const { clearTokens } = useAuth.getState();

  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] =
    useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLogoutConfirmationOpen) return;

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLogoutConfirmationOpen]);

  const openLogoutConfirmation = () => setIsLogoutConfirmationOpen(true);
  const closeLogoutConfirmation = () => setIsLogoutConfirmationOpen(false);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);

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
      <Confirmation
        isOpen={isLogoutConfirmationOpen}
        description="Are you sure you want to log out?"
        onSubmitFn={logout}
        onClose={closeLogoutConfirmation}
      />
      <div className="profile-menu-wrapper" ref={wrapperRef}>
        <button onClick={() => setIsProfileMenuOpen((prev) => !prev)}>
          <RxAvatar size={30} />
        </button>
        <Popover isOpen={isProfileMenuOpen} onClose={closeProfileMenu}>
          <ProfileMenu
            closeProfileMenu={closeProfileMenu}
            openLogoutConfirmation={openLogoutConfirmation}
          />
        </Popover>
      </div>
    </header>
  );
};

export default Header;
