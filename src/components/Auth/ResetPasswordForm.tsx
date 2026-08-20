import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { MdLockOutline } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

import { resetPasswordAsync } from "../../api/auth";
import { resetPasswordSchema } from "../../schemas/auth";
import { getFieldError } from "../../utils/auth";
import type { TErrors } from "../../types/ui";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ErrorMessage from "../ui/Error";
import "../../styles/auth/login.scss";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const { token } = useSearch({
    from: "/_public/reset-password",
  });

  const [errors, setErrors] = useState<TErrors[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const newPasswordError = getFieldError("newPassword", errors);
  const confirmNewPasswordError = getFieldError("confirmNewPassword", errors);

  const resetPassword = async (formData: FormData) => {
    setErrors([]);
    setErrorMessage("");

    const payload = {
      Token: token,
      NewPassword: formData.get("newPassword") as string,
      ConfirmNewPassword: formData.get("confirmNewPassword") as string,
    };

    const validation = resetPasswordSchema.safeParse(payload);

    if (!validation.success) {
      const zodErrors = validation.error.issues.map((issue) => ({
        field: issue.path[0] as string,
        messages: [issue.message],
      }));

      setErrors(zodErrors);
      throw new Error("Validation failed");
    }

    return await resetPasswordAsync(payload);
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async () => {
      toast.success(
        "Your password has been reset successfully. You can now log in.",
      );
      navigate({ to: "/login" });
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
            name="newPassword"
            type="password"
            placeholder="New Password"
            icon={MdLockOutline}
            errorMessage={newPasswordError && newPasswordError.messages[0]}
          />
          <Input
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm New Password"
            icon={MdLockOutline}
            errorMessage={
              confirmNewPasswordError && confirmNewPasswordError.messages[0]
            }
          />
        </div>
      </div>
      <Button type="submit" label="Reset" />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </form>
  );
};

export default ResetPasswordForm;
