// import { useNavigate } from "@tanstack/react-router";
import { MdLockOutline } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";

import Button from "../ui/Button";
import Input from "../ui/Input";
import "../../styles/login.scss";

const LoginForm = () => {
  // const navigate = useNavigate();

  const login = async (formData: FormData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    console.log(username, password);
    // navigate({ to: "/expense" });
  };

  return (
    <form action={login}>
      <Input name="username" placeholder="Username" icon={TiUserOutline} />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        icon={MdLockOutline}
      />
      <Button type="submit" label="Log in" />
    </form>
  );
};

export default LoginForm;
