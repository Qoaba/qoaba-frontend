import {
  Text,
  TextInput,
  Group,
  Button,
  Divider,
  List,
  createStyles,
  Box,
  rem,
  PasswordInput,
} from "@mantine/core";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Form, useForm } from "@mantine/form";
import { useState } from "react";
import { sign } from "crypto";

const useStyles = createStyles((theme) => ({
  list: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: rem(14),
  },
}));

export function ModelOverlay({
  index,
  manipulateModal,
}: {
  index: number;
  manipulateModal: any;
}) {
  const [modalContent, setModalContent] = useState("form");
  const { classes, theme, cx } = useStyles();
  const { data: session } = useSession();

  const id: string = session!.user.id;

  const changeUsernameForm = useForm({
    initialValues: {
      username: "",
    },

    validate: {
      username: (val: string) =>
        val.length < 5 ? "Username must be at least 5 characters long" : null,
    },
  });
  const onChangeUsernameFormSubmit = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/accounts/${id}/username`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: changeUsernameForm.values.username,
          email: "",
          password: "",
        }),
      }
    );

    if (res.ok) {
      setModalContent("success");
    } else {
      setModalContent("failure");
    }
  };

  const changeEmailForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val: string) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const onChangeEmailFormSubmit = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/accounts/${id}/email`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "",
        email: changeEmailForm.values.email,
        password: changeEmailForm.values.password,
      }),
    });

    if (res.ok) {
      setModalContent("success");
    } else {
      setModalContent("failure");
    }
  };

  const changePasswordForm = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },

    validate: {
      currentPassword: (val: string) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      newPassword: (val: string) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const onChangePasswordFormSubmit = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/accounts/${id}/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "",
          email: "",
          password: `${changePasswordForm.values.currentPassword} ${changePasswordForm.values.newPassword}`,
        }),
      }
    );

    if (res.ok) {
      setModalContent("success");
    } else {
      setModalContent("failure");
    }
  };

  const deleteAccountForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val: string) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const onDeleteAccountFormSubmit = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/accounts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "",
        email: deleteAccountForm.values.email,
        password: deleteAccountForm.values.password,
      }),
    });

    if (res.ok) {
      setModalContent("success");
      await signOut({
        callbackUrl: "/auth/portal",
      });
    } else {
      setModalContent("failure");
    }
  };

  return (
    <>
      {index === 0 && (
        <>
          {modalContent === "form" && (
            <form onSubmit={changeUsernameForm.onSubmit(() => {})}>
              <TextInput
                required
                withAsterisk={false}
                variant="filled"
                radius="md"
                label="New username"
                placeholder="Enter your new username..."
                mt="md"
                mb="md"
                {...changeUsernameForm.getInputProps("username")}
              />

              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button
                  type="submit"
                  onClick={
                    changeUsernameForm.isValid("username")
                      ? onChangeUsernameFormSubmit
                      : () => {}
                  }
                >
                  Confirm change
                </Button>
                <Button
                  style={{ background: theme.colors.dark[3] }}
                  onClick={() => manipulateModal(index)}
                >
                  Cancel
                </Button>
              </Group>
            </form>
          )}

          {modalContent === "success" && (
            <>
              <Text mt="md" mb="md">
                Your username has been successfully updated! To see the changes,
                please log out and log back in.
              </Text>
              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button onClick={() => manipulateModal(index)}>Got it</Button>
              </Group>
            </>
          )}

          {modalContent === "failure" && (
            <>
              <Text mt="md" mb="md">
                Something went wrong. Please try again with a different
                username.
              </Text>
              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button onClick={() => manipulateModal(index)}>Got it</Button>
              </Group>
            </>
          )}
        </>
      )}

      {index === 1 && (
        <>
          {modalContent === "form" && (
            <form onSubmit={changeEmailForm.onSubmit(() => {})}>
              <TextInput
                required
                withAsterisk={false}
                variant="filled"
                radius="md"
                label="New email"
                placeholder="Enter your new email address..."
                mt="md"
                mb="md"
                {...changeEmailForm.getInputProps("email")}
              />

              <PasswordInput
                required
                withAsterisk={false}
                variant="filled"
                radius="md"
                label="Password"
                placeholder="Enter your password..."
                {...changeEmailForm.getInputProps("password")}
              />

              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button
                  onClick={
                    changeEmailForm.isValid("email") &&
                    changeEmailForm.isValid("password")
                      ? onChangeEmailFormSubmit
                      : () => {}
                  }
                  type="submit"
                >
                  Confirm change
                </Button>
                <Button
                  style={{ background: theme.colors.dark[3] }}
                  onClick={() => manipulateModal(index)}
                >
                  Cancel
                </Button>
              </Group>
            </form>
          )}

          {modalContent === "success" && (
            <>
              <Text mt="md" mb="md">
                Your email has been successfully updated! To see the changes,
                please log out and log back in.
              </Text>
              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button onClick={() => manipulateModal(index)}>Got it</Button>
              </Group>
            </>
          )}

          {modalContent === "failure" && (
            <>
              <Text mt="md" mb="md">
                Something went wrong. Please try again with a different email
                and/or password.
              </Text>
              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button onClick={() => manipulateModal(index)}>Got it</Button>
              </Group>
            </>
          )}
        </>
      )}

      {index === 2 && (
        <>
          {modalContent === "form" && (
            <form onSubmit={changePasswordForm.onSubmit(() => {})}>
              <PasswordInput
                required
                withAsterisk={false}
                variant="filled"
                radius="md"
                label="Current password"
                placeholder="Enter your old password..."
                mt="md"
                mb="md"
                {...changePasswordForm.getInputProps("currentPassword")}
              />

              <PasswordInput
                required
                withAsterisk={false}
                variant="filled"
                radius="md"
                label="New password"
                placeholder="Enter your new password..."
                {...changePasswordForm.getInputProps("newPassword")}
              />

              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button
                  onClick={
                    changePasswordForm.isValid("currentPassword") &&
                    changePasswordForm.isValid("newPassword")
                      ? onChangePasswordFormSubmit
                      : () => {}
                  }
                  type="submit"
                >
                  Confirm change
                </Button>
                <Button style={{ background: theme.colors.dark[3] }}>
                  Cancel
                </Button>
              </Group>
            </form>
          )}

          {modalContent === "success" && (
            <>
              <Text mt="md" mb="md">
                Your password has been successfully updated! To see the changes,
                please log out and log back in.
              </Text>
              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button onClick={() => manipulateModal(index)}>Got it</Button>
              </Group>
            </>
          )}

          {modalContent === "failure" && (
            <>
              <Text mt="md" mb="md">
                Something went wrong. Please try again with the correct current
                password.
              </Text>
              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button onClick={() => manipulateModal(index)}>Got it</Button>
              </Group>
            </>
          )}
        </>
      )}

      {index === 3 && (
        <>
          {modalContent === "form" && (
            <form onSubmit={deleteAccountForm.onSubmit(() => {})}>
              <Text mt="md" mb="sm">
                Deleting your account is a permanent action with significant
                consequences. Before proceeding, carefully review the following
                information:
              </Text>

              <Box w={400}>
                <List mb="sm" className={classes.list}>
                  <List.Item>
                    All your commercial licenses will be revoked.
                  </List.Item>
                  <List.Item>
                    Payments associated with your account will not be eligible
                    for refunds.
                  </List.Item>
                </List>
              </Box>

              <Text mb="sm" c="red">
                Important: Account deletion is irreversible. Once your account
                is deleted, it cannot be recovered under any circumstances.
              </Text>

              <Text>
                If you fully understand the consequences outlined above and
                still wish to proceed, please confirm by entering your email and
                password below:
              </Text>

              <TextInput
                required
                withAsterisk={false}
                variant="filled"
                radius="md"
                label="Email"
                placeholder="Enter email to confirm..."
                mt="md"
                mb="md"
                {...deleteAccountForm.getInputProps("email")}
              />

              <PasswordInput
                required
                withAsterisk={false}
                variant="filled"
                radius="md"
                label="Password"
                placeholder="Enter password to confirm..."
                {...deleteAccountForm.getInputProps("password")}
              />

              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button
                  color="red"
                  onClick={
                    deleteAccountForm.isValid("email") &&
                    deleteAccountForm.isValid("password")
                      ? onDeleteAccountFormSubmit
                      : () => {}
                  }
                  type="submit"
                >
                  Confirm change
                </Button>
                <Button
                  style={{ background: theme.colors.dark[3] }}
                  onClick={() => manipulateModal(index)}
                >
                  Cancel
                </Button>
              </Group>
            </form>
          )}

          {modalContent === "success" && (
            <>
              <Text mt="md" mb="md">
                Your email has been successfully updated! To see the changes,
                please log out and log back in.
              </Text>
              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button onClick={() => manipulateModal(index)}>Got it</Button>
              </Group>
            </>
          )}

          {modalContent === "failure" && (
            <>
              <Text mt="md" mb="md">
                Something went wrong. Please try again with a different email
                and/or password.
              </Text>
              <Divider mt="xl" />
              <Group mt="xl" position="right">
                <Button onClick={() => manipulateModal(index)}>Got it</Button>
              </Group>
            </>
          )}
        </>
      )}
    </>
  );
}
