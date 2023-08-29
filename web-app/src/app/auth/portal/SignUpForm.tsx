import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
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
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const onSubmit = async () => {
    notifications.show({
      id: "uploading-notification",
      loading: true,
      title: "Creating user account",
      message: "User account is being created, please wait...",
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const res = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.values.email,
          password: form.values.password,
          username: form.values.name,
        }),
      });

      if (res.ok) {
        notifications.update({
          id: "uploading-notification",
          color: "teal",
          title: "User account created successfully",
          message: "Redirecting to account page...",
          icon: <IconCheck size="1rem" />,
          autoClose: 2000,
        });
        await signIn("credentials", {
          email: form.values.email,
          password: form.values.password,
          redirect: true,
          callbackUrl: "/auth/account",
        });
      } else {
        notifications.update({
          id: "uploading-notification",
          color: "red",
          title: "Error creating user account",
          message:
            "There was an error creating the user account. Please try again.",
          icon: <IconX size="1rem" />,
          autoClose: 3000,
        });
      }
    } catch (error) {
      notifications.update({
        id: "uploading-notification",
        color: "red",
        title: "Error creating user account",
        message:
          "There was an error creating the user account. Please try again.",
        icon: <IconX size="1rem" />,
        autoClose: 3000,
      });
    }
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
        <Button onClick={onSubmit} type="submit" radius="xl">
          Sign up
        </Button>
      </Group>
    </form>
  );
}
