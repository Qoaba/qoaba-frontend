import { GoogleIcon } from "./GoogleIcon";
import { Button, ButtonProps, Group } from "@mantine/core";
import { signIn } from "next-auth/react";

export function GoogleButton(props: ButtonProps) {
  const onSubmit = async () => {
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/auth/account",
    });
  };

  return (
    <Button
      onClick={() => onSubmit()}
      leftIcon={<GoogleIcon />}
      variant="filled"
      {...props}
      radius="sm"
    />
  );
}
