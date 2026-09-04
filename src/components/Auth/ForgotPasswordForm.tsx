import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { forgotPasswordAsync } from "../../api/auth";
import { forgotPasswordSchema } from "../../schemas/auth";
import { getFieldError } from "../../utils/auth";
import type { TErrors } from "../../types/ui";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ErrorMessage from "../ui/ErrorMessage";

const ForgotPasswordForm = () => {
  const [errors, setErrors] = useState<TErrors[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const emailError = getFieldError("email", errors);

  const forgotPassword = async (formData: FormData) => {
    setErrors([]);
    setErrorMessage("");

    const payload = {
      Email: formData.get("email") as string,
    };

    const validation = forgotPasswordSchema.safeParse(payload);

    if (!validation.success) {
      const zodErrors = validation.error.issues.map((issue) => ({
        field: issue.path[0] as string,
        messages: [issue.message],
      }));

      setErrors(zodErrors);
      throw new Error("Validation failed");
    }

    return await forgotPasswordAsync(payload);
  };

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: async () => {
      toast.success("Check your email for a password reset link.");
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
            name="email"
            placeholder="Email"
            icon={MdOutlineEmail}
            errorMessage={emailError && emailError.messages[0]}
          />
        </div>
      </div>
      <Button type="submit" label="Send Reset Link" />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </form>
  );
};

export default ForgotPasswordForm;
