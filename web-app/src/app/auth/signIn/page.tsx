"use client";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  createStyles,
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Title,
  PaperProps,
  Container,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  rem,
  Image,
  Center,
  Space,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import PasswordStrength from "./PasswordStrength";
import { signIn } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: rem(20),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6],
  },

  card: {
    border: "none",
  },
}));

export function AuthenticationTitle(props: PaperProps) {
  const { classes } = useStyles();
  const [type, toggle] = useToggle(["sign in", "sign up"]);
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
    const result = await signIn("credentials", {
      username: form.values.name,
      password: form.values.password,
      redirect: true,
      callbackUrl: "/auth/account",
    });
  };

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ width: "420px" }}>
        <Paper radius="md" p="xl">
          <Center>
            <Image maw={80} src="/logo.svg" alt="Qoaba logo" />
          </Center>

          <Space h={30} />

          <Title className={classes.title}>
            {type === "sign up"
              ? "Create an account"
              : "Sign in to your account"}
          </Title>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="lg" className={classes.card}>
              Google
            </GoogleButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form onSubmit={form.onSubmit(() => {})}>
            <Stack>
              {type === "sign up" && (
                <TextInput
                  required
                  label="Email"
                  placeholder="Your email"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                  radius="md"
                />
              )}

              <TextInput
                required
                label="Username"
                placeholder="Your username"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />

              {type !== "sign up" && (
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                  radius="md"
                />
              )}

              {type === "sign up" && <PasswordStrength />}

              {type === "sign up" && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                />
              )}
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "sign up"
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Create an account"}
              </Anchor>
              <Button onClick={onSubmit} type="submit" radius="xl">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      </div>
    </Container>
  );
}

export default AuthenticationTitle;
