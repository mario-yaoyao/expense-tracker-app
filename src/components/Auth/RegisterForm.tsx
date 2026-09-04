import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MdLockOutline, MdOutlineBadge, MdOutlineEmail } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";
import { IoCallOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

import { registerAsync } from "../../api/auth";
import { registerSchema } from "../../schemas/auth";
import { getFieldError } from "../../utils/auth";
import type { TErrors } from "../../types/ui";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ErrorMessage from "../ui/ErrorMessage";
import "../../styles/auth/register.scss";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<TErrors[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fullNameError = getFieldError("fullname", errors);
  const usernameError = getFieldError("username", errors);
  const emailError = getFieldError("email", errors);
  const contactNumberError = getFieldError("contactnumber", errors);
  const passwordError = getFieldError("password", errors);
  const confirmPasswordError = getFieldError("confirmpassword", errors);

  const register = async (formData: FormData) => {
    setErrors([]);
    setErrorMessage("");

    const fullName = formData.get("fullName") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const payload = {
      FullName: fullName,
      Username: username,
      Email: email,
      ContactNumber: contactNumber,
      Password: password,
      ConfirmPassword: confirmPassword,
    };

    const validation = registerSchema.safeParse(payload);

    if (!validation.success) {
      const zodErrors = validation.error.issues.map((issue) => ({
        field: issue.path[0] as string,
        messages: [issue.message],
      }));

      setErrors(zodErrors);
      throw new Error("Validation failed");
    }

    return await registerAsync(payload);
  };

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Account registered successfully");
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
      <Input
        name="fullName"
        placeholder="Full Name"
        icon={MdOutlineBadge}
        errorMessage={fullNameError && fullNameError.messages[0]}
      />
      <Input
        name="username"
        placeholder="Username"
        icon={TiUserOutline}
        errorMessage={usernameError && usernameError.messages[0]}
      />
      <Input
        name="email"
        placeholder="Email"
        icon={MdOutlineEmail}
        errorMessage={emailError && emailError.messages[0]}
      />
      <Input
        name="contactNumber"
        placeholder="Contact Number"
        icon={IoCallOutline}
        errorMessage={contactNumberError && contactNumberError.messages[0]}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        icon={MdLockOutline}
        errorMessage={passwordError && passwordError.messages[0]}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        icon={MdLockOutline}
        errorMessage={confirmPasswordError && confirmPasswordError.messages[0]}
      />
      <Button type="submit" label="Register" />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </form>
  );
};

export default RegisterForm;
