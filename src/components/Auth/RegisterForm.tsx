import { MdLockOutline, MdOutlineBadge } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";
import { IoCallOutline } from "react-icons/io5";

import Button from "../ui/Button";
import Input from "../ui/Input";
import "../../styles/register.scss";

const RegisterForm = () => {
  const login = async (formData: FormData) => {
    const fullName = formData.get("fullName");
    const username = formData.get("username");
    const contactNumber = formData.get("contactNumber");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    console.log(fullName, username, contactNumber, password, confirmPassword);
  };

  return (
    <form action={login}>
      <Input name="fullName" placeholder="Full Name" icon={MdOutlineBadge} />
      <Input name="username" placeholder="Username" icon={TiUserOutline} />
      <Input
        name="contactNumber"
        placeholder="Contact Number"
        icon={IoCallOutline}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        icon={MdLockOutline}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        icon={MdLockOutline}
      />
      <Button label="Log in" />
    </form>
  );
};

export default RegisterForm;
