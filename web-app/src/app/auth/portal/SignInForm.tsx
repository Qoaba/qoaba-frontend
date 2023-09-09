import {
  Stack,
  Anchor,
  Button,
  Group,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";

export default function SignInForm(props: any) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val: string) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: form.values.email,
      password: form.values.password,
      redirect: true,
      callbackUrl: "/auth/account",
    });
  };

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Stack>
        <TextInput
          id="1"
          required
          label="Email"
          placeholder="Your email"
          value={form.values.email}
          variant="filled"
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && "Invalid email"}
        />

        <PasswordInput
          required
          id="2"
          label="Password"
          placeholder="Your password"
          value={form.values.password}
          variant="filled"
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={
            form.errors.password &&
            "Password should include at least 6 characters"
          }
        />
      </Stack>

      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => props.toggle()}
          size="xs"
        >
          Don&#39;t have an account? Create an account
        </Anchor>
        <Button onClick={onSubmit} type="submit">
          Sign in
        </Button>
      </Group>
    </form>
  );
}
