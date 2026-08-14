import { useNavigate } from "@tanstack/react-router";

import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import Button from "../components/ui/Button";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import "../styles/auth/auth.scss";

const AuthPage = ({ authForm }: { authForm: string }) => {
  const navigate = useNavigate();

  const authConfig = {
    login: {
      title: "Log in to your Account",
      subtitle: "Welcome back! Please log in to continue",
      form: <LoginForm />,
    },
    register: {
      title: "Create an Account",
      subtitle: "Sign up to start tracking your expenses.",
      form: <RegisterForm />,
    },
    forgotPassword: {
      title: "Forgot Password",
      subtitle: "Enter your email to receive a password reset link.",
      form: <ForgotPasswordForm />,
    },
  };

  const current = authConfig[authForm as keyof typeof authConfig];

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-body">
          <div className="auth-header">
            <h2>{current.title}</h2>
            <h3>{current.subtitle}</h3>
          </div>
          {current.form}
          <div className="auth-footer">
            {authForm === "login" && (
              <>
                <p>Don't have an account?</p>
                <Button
                  label="Create an account"
                  style="link"
                  onClickFn={() => navigate({ to: "/register" })}
                />
              </>
            )}
            {authForm === "register" && (
              <>
                <p>Already have an account?</p>
                <Button
                  label="Log in"
                  style="link"
                  onClickFn={() => navigate({ to: "/login" })}
                />
              </>
            )}
            {authForm === "forgotPassword" && (
              <Button
                label="Back to Login"
                style="back"
                onClickFn={() => navigate({ to: "/login" })}
              />
            )}
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
