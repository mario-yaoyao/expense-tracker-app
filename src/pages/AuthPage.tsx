import { useNavigate } from "@tanstack/react-router";

import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import Button from "../components/ui/Button";
import "../styles/auth/auth.scss";

const AuthPage = ({ authForm }: { authForm: string }) => {
  const navigate = useNavigate();

  const toggleAuthForms = () => {
    navigate({
      to: authForm === "login" ? "/register" : "/login",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-body">
          <div className="auth-header">
            <h2>
              {authForm === "login"
                ? "Log in to your Account"
                : "Create an Account"}
            </h2>
            <h3>
              {authForm === "login"
                ? "Welcome back! Please log in to continue"
                : "Sign up to start tracking your expenses."}
            </h3>
          </div>
          {authForm === "login" ? <LoginForm /> : <RegisterForm />}
          <div className="auth-footer">
            <p>
              {authForm === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Button
              onClickFn={toggleAuthForms}
              label={authForm === "login" ? "Create an account" : "Log in"}
              style="link"
            />
          </div>
        </div>
      </div>
      <img
        src="/entrepreneur-working-with-bills.jpg"
        alt="expense tracker visual"
        className="visual"
      />
    </div>
  );
};

export default AuthPage;
