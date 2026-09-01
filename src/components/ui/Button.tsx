import { IoAddOutline } from "react-icons/io5";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";

import type { TButton } from "../../types/ui";
import "../../styles/ui/button.scss";

const Button = ({
  type = "button",
  label,
  style = "default",
  showIcon = true,
  compactOnMobile,
  onClickFn,
  fullWidthOnMobile,
}: TButton) => {
  const icons = {
    success: IoAddOutline,
    warning: BsPencil,
    danger: BsTrash3,
    back: IoIosArrowRoundBack,
  };
  const Icon = icons[style as keyof typeof icons];

  return (
    <button
      type={type}
      onClick={onClickFn}
      className={`
        btn
        btn-${style}
        ${compactOnMobile ? "btn-compact" : ""}
        ${fullWidthOnMobile ? "btn-full-mobile" : ""}
      `}
    >
      {showIcon && Icon && <Icon size={20} />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
