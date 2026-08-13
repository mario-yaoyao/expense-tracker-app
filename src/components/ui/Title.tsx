// TODO: add breadcrumb functionality

import Button from "./Button";
import "../../styles/ui/title.scss";
import type { ITitle } from "../../types/ui";

const Title = ({ text, action, openModalFn }: ITitle) => {
  return (
    <div className="section-header">
      <h2>{text}</h2>
      <div className="btns-wrapper">
        {action && (
          <Button
            label={action.label}
            style={action.variant}
            onClickFn={openModalFn}
          />
        )}
      </div>
    </div>
  );
};

export default Title;
