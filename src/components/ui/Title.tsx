import type { ITitle } from "../../types/ui";
import Button from "./Button";
import "../../styles/ui/title.scss";

const Title = ({ text, action, openModalFn }: ITitle) => {
  return (
    <div className="section-header">
      <h2>{text}</h2>
      <div className="btns-wrapper">
        {action && (
          <Button
            label={action.label}
            style={action.variant}
            compactOnMobile={action.compactOnMobile}
            onClickFn={openModalFn}
          />
        )}
      </div>
    </div>
  );
};

export default Title;
