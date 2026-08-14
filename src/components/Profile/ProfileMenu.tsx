import { Link } from "@tanstack/react-router";
import { RxAvatar } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { VscSignOut } from "react-icons/vsc";

import { useAuth } from "../../hooks/useAuth";
import "../../styles/profile/profile-menu.scss";

export type TProfileMenu = {
  closeProfileMenu: () => void;
  openLogoutConfirmation: () => void;
};

const ProfileMenu = ({
  closeProfileMenu,
  openLogoutConfirmation,
}: TProfileMenu) => {
  const { user } = useAuth.getState();

  const profileMenu = [
    {
      id: 1,
      label: "Profile",
      to: "/profile",
      icon: GoPerson,
    },
    {
      id: 2,
      label: "Log out",
      onClick: openLogoutConfirmation,
      icon: VscSignOut,
    },
  ];

  return (
    <div className="profile-menu">
      <div className="user-info">
        <RxAvatar />
        <div className="details">
          <p>{user?.username}</p>
          <p>{user?.role}</p>
        </div>
      </div>
      {profileMenu.map((menu) =>
        menu.to ? (
          <Link
            key={menu.id}
            to={menu.to}
            className="menu-btn"
            onClick={closeProfileMenu}
          >
            <menu.icon size={24} />
            {menu.label}
          </Link>
        ) : (
          <button key={menu.id} onClick={menu.onClick} className="menu-btn">
            <menu.icon size={24} />
            {menu.label}
          </button>
        ),
      )}
    </div>
  );
};

export default ProfileMenu;
