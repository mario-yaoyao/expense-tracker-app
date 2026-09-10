import type { TConfirmation } from "../../types/ui";
import Button from "./Button";
import "../../styles/ui/confirmation.scss";

const Confirmation = ({
  isOpen,
  action,
  description,
  onSubmitFn,
  onClose,
  isDisabled,
}: TConfirmation) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`confirmation-header ${action}`}>
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
            label={isDisabled ? "Confirming..." : "Confirm"}
            style={action === "success" ? "success" : "danger"}
            showIcon={false}
            onClickFn={onSubmitFn}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
