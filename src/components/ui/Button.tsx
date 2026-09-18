import { IoAddOutline } from "react-icons/io5";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosCalendar } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

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
  isDisabled,
}: TButton) => {
  const icons = {
    success: IoAddOutline,
    warning: BsPencil,
    danger: BsTrash3,
    back: IoIosArrowRoundBack,
    filter: FiFilter,
    calendar: IoIosCalendar,
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
      disabled={isDisabled}
    >
      {showIcon && Icon && <Icon size={20} />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
