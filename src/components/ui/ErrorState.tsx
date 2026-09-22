import { IoWarning } from "react-icons/io5";

import type { TErrorState } from "../../types/ui";
import "../../styles/ui/error-state.scss";

const ErrorState = ({
  singleLiner,
  message = "Something went wrong while retrieving records. Please try again.",
}: TErrorState) => {
  return singleLiner ? (
    <p className="single-message">{message}</p>
  ) : (
    <div className="error-state">
      <IoWarning className="icon" />
      <p className="title">Failed to load data</p>
      <p className="message">{message}</p>
    </div>
  );
};

export default ErrorState;
