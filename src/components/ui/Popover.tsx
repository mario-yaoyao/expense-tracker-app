import type { TPopover } from "../../types/ui";
import "../../styles/ui/popover.scss";

const Popover = ({ isOpen, children }: TPopover) => {
  if (!isOpen) return null;

  return (
    <div className="popover-content">
      <div className="popover-body">{children}</div>
    </div>
  );
};

export default Popover;
