import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { changePasswordASync, getProfileAsync } from "../../api/profile";
import { useProfile } from "../../hooks/useProfile";
import { changePasswordSchema } from "../../schemas/profile";
import { getFieldError } from "../../utils/auth";
import type { TErrors } from "../../types/ui";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ErrorMessage from "../ui/Error";
import "../../styles/profile/change-password.scss";

export type TChangePasswordForm = {
  closeModalFn: () => void;
};

const ChangePasswordForm = ({ closeModalFn }: TChangePasswordForm) => {
  const { setProfile } = useProfile();

  const [errors, setErrors] = useState<TErrors[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const currentPasswordError = getFieldError("currentPassword", errors);
  const newPasswordError = getFieldError("newPassword", errors);
  const confirmNewPasswordError = getFieldError("confirmNewPassword", errors);

  const submitChangePassword = async (formData: FormData) => {
    setErrors([]);
    setErrorMessage("");

    const payload = {
      CurrentPassword: formData.get("currentPassword") as string,
      NewPassword: formData.get("newPassword") as string,
      ConfirmNewPassword: formData.get("confirmNewPassword") as string,
    };

    const validation = changePasswordSchema.safeParse(payload);

    if (!validation.success) {
      const zodErrors = validation.error.issues.map((issue) => ({
        field: issue.path[0] as string,
        messages: [issue.message],
      }));

      setErrors(zodErrors);
      throw new Error("Validation failed");
    }

    return await changePasswordASync(payload);
  };

  const mutation = useMutation({
    mutationFn: submitChangePassword,
    onSuccess: async () => {
      const profile = await getProfileAsync();
      setProfile(profile.data);

      toast.success("Password successfully changed");
      closeModalFn();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log("API RESPONSE:");
        console.log(error.response?.data);

        if (error.response?.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrorMessage(error.response?.data.errorMessage);
        }
      }
    },
  });

  console.log(errors);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(new FormData(e.currentTarget));
      }}
      className={`expense-form update`}
    >
      <div className="form-header">
        <h2>Change Password</h2>
        <p>Enter your current password and choose a new password.</p>
      </div>
      <Input
        type="password"
        label="Current Password"
        name="currentPassword"
        placeholder="Enter your current password"
        errorMessage={currentPasswordError && currentPasswordError.messages[0]}
      />
      <Input
        type="password"
        label="New Password"
        name="newPassword"
        placeholder="Enter a new password"
        errorMessage={newPasswordError && newPasswordError.messages[0]}
      />
      <Input
        type="password"
        label="Confirm New Password"
        name="confirmNewPassword"
        placeholder="Re-enter your new password"
        errorMessage={
          confirmNewPasswordError && confirmNewPasswordError.messages[0]
        }
      />
      <Button
        type="submit"
        label="Change Password"
        style="warning"
        showIcon={false}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </form>
  );
};

export default ChangePasswordForm;
