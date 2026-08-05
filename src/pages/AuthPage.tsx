import { useState } from "react";

import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import Button from "../components/ui/Button";
import "../styles/auth.scss";

const AuthPage = () => {
  const [authForm, setAuthForm] = useState("login"); // TODO: get value by url query params

  const toggleAuthForms = () => {
    if (authForm === "login") {
      setAuthForm("register");
    } else {
      setAuthForm("login");
    }
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
          {/* <div className="auth-body"> */}
          {authForm === "login" ? <LoginForm /> : <RegisterForm />}
          {/* </div> */}
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
