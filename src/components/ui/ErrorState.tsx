import { IoWarning } from "react-icons/io5";
import "../../styles/ui/error-state.scss";

type TErrorState = {
  singleLiner?: boolean;
  message?: string;
};

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
