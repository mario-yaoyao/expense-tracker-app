import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { loginAsync } from "../../api/auth";
import { getFieldError } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema } from "../../schemas/auth";
import type { TErrors } from "../../types/ui";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ErrorMessage from "../ui/Error";
import "../../styles/auth/login.scss";

const LoginForm = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  const [errors, setErrors] = useState<TErrors[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const usernameError = getFieldError("username", errors);
  const passwordError = getFieldError("password", errors);

  const login = async (formData: FormData) => {
    setErrors([]);
    setErrorMessage("");

    const payload = {
      Username: formData.get("username") as string,
      Password: formData.get("password") as string,
    };

    const validation = loginSchema.safeParse(payload);

    if (!validation.success) {
      const zodErrors = validation.error.issues.map((issue) => ({
        field: issue.path[0] as string,
        messages: [issue.message],
      }));

      setErrors(zodErrors);
      throw new Error("Validation failed");
    }

    return await loginAsync(payload);
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      setTokens({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });

      toast.success("Login successful");
      router.invalidate();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrorMessage(error.response?.data.errorMessage);
        }
      }
    },
  });

  const goToForgotPassword = () => {
    navigate({
      to: "/forgot-password",
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(new FormData(e.currentTarget));
      }}
    >
      <div className="form-content">
        <div className="form-fields">
          <Input
            name="username"
            placeholder="Username"
            icon={TiUserOutline}
            errorMessage={usernameError && usernameError.messages[0]}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon={MdLockOutline}
            errorMessage={passwordError && passwordError.messages[0]}
          />
        </div>
        <Button
          onClickFn={goToForgotPassword}
          label="Forgot your password?"
          style="link"
        />
      </div>
      <Button type="submit" label="Log in" />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </form>
  );
};

export default LoginForm;
