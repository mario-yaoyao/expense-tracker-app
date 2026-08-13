import Button from "./Button";
import "../../styles/ui/confirmation.scss";
import type { TConfirmation } from "../../types/ui";

const Confirmation = ({
  isOpen,
  description,
  onSubmitFn,
  onClose,
}: TConfirmation) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-header">
          <p>{description}</p>
        </div>
        <div className="btn-actions">
          <Button
            label="Cancel"
            style="outline"
            showIcon={false}
            onClickFn={onClose}
          />
          <Button
            label="Confirm"
            style="danger"
            showIcon={false}
            onClickFn={onSubmitFn}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
