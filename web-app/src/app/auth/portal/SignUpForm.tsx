import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import PasswordStrength from "./PasswordStrength";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";

export default function SignUpForm(props: any) {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
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
    try {
      const res = await fetch("http://127.0.0.1:8000/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.values.email,
          password: form.values.password,
          name: form.values.name,
        }),
      });
      console.log(res.json());

      if (res.ok) {
        await signIn("credentials", {
          email: form.values.email,
          password: form.values.password,
          redirect: true,
          callbackUrl: "/auth/account",
        });
      } else {
        throw new Error("Error creating user account");
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Stack>
        <TextInput
          required
          label="Email"
          placeholder="Your email"
          value={form.values.email}
          variant="filled"
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && "Invalid email"}
          radius="md"
        />

        <TextInput
          required
          label="Username"
          placeholder="Your username"
          value={form.values.name}
          variant="filled"
          onChange={(event) =>
            form.setFieldValue("name", event.currentTarget.value)
          }
          radius="md"
        />

        <PasswordStrength
          password={form.values.password}
          setPassword={(newPassword) =>
            form.setFieldValue("password", newPassword)
          }
        />
        <Checkbox
          label="I accept terms and conditions"
          checked={form.values.terms}
          onChange={(event) =>
            form.setFieldValue("terms", event.currentTarget.checked)
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
          Already have an account? Sign in
        </Anchor>
        <Button onClick={onSubmit} type="submit">
          Sign up
        </Button>
      </Group>
    </form>
  );
}
