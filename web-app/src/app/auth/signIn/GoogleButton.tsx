import { GoogleIcon } from "./GoogleIcon";
import { Button, ButtonProps, Group } from "@mantine/core";
import { signIn } from "next-auth/react"

export function GoogleButton(props: ButtonProps) {
  return <Button onClick={() => signIn("google")} leftIcon={< GoogleIcon />} variant="filled" {...props} />;
}
