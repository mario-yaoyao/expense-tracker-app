import "../../styles/ui/error-message.scss";

const ErrorMessage = ({ errorMessage }: { errorMessage?: string }) => {
  return <span className="error-msg">{errorMessage}</span>;
};

export default ErrorMessage;
