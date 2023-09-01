import {
  Text,
  TextInput,
  Group,
  Button,
  Divider,
  List,
  createStyles,
  Box,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  list: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

export function ModelOverlay({ index }: { index: number }) {
  const { classes, theme, cx } = useStyles();
  return (
    <>
      {index === 0 && (
        <>
          <TextInput
            label="New username"
            placeholder="Enter your new username..."
            mt="md"
            mb="md"
          ></TextInput>

          <Divider mt="xl" />
          <Group mt="xl" position="right">
            <Button>Confirm change</Button>
            <Button style={{ background: theme.colors.dark[3] }}>Cancel</Button>
          </Group>
        </>
      )}

      {index === 1 && (
        <>
          <TextInput
            label="New email"
            placeholder="Enter your new email address..."
            mt="md"
            mb="md"
          ></TextInput>

          <TextInput
            label="Password"
            placeholder="Enter your password..."
          ></TextInput>

          <Divider mt="xl" />
          <Group mt="xl" position="right">
            <Button>Confirm change</Button>
            <Button style={{ background: theme.colors.dark[3] }}>Cancel</Button>
          </Group>
        </>
      )}

      {index === 2 && (
        <>
          <TextInput
            label="Current password"
            placeholder="Enter your old password..."
            mt="md"
            mb="md"
          ></TextInput>

          <TextInput
            label="New password"
            placeholder="Enter your new password..."
          ></TextInput>

          <Divider mt="xl" />
          <Group mt="xl" position="right">
            <Button>Confirm change</Button>
            <Button style={{ background: theme.colors.dark[3] }}>Cancel</Button>
          </Group>
        </>
      )}

      {index === 3 && (
        <>
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
                Payments associated with your account will not be eligible for
                refunds.
              </List.Item>
            </List>
          </Box>

          <Text mb="sm" c="red">
            Important: Account deletion is irreversible. Once your account is
            deleted, it cannot be recovered under any circumstances.
          </Text>

          <Text>
            If you fully understand the consequences outlined above and still
            wish to proceed, please confirm by entering your email and password
            below:
          </Text>

          <TextInput
            label="Email"
            placeholder="Enter email to confirm..."
            mt="md"
            mb="md"
          ></TextInput>

          <TextInput
            label="Password"
            placeholder="Enter password to confirm..."
          ></TextInput>

          <Divider mt="xl" />
          <Group mt="xl" position="right">
            <Button color="red">Confirm change</Button>
            <Button style={{ background: theme.colors.dark[3] }}>Cancel</Button>
          </Group>
        </>
      )}
    </>
  );
}
