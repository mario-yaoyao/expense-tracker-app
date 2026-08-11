import { RxCross2 } from "react-icons/rx";

import type { TModal } from "../../types/ui";
import "../../styles/ui/modal.scss";

const Modal = ({ isOpen, onClose, children }: TModal) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button onClick={onClose}>
            <RxCross2 color="red" size={22} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
