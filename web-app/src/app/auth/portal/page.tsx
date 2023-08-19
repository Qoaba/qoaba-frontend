"use client";

import {
  Paper,
  PaperProps,
  Container,
  Image,
  Center,
  Space,
} from "@mantine/core";
import AuthenticationForm from "./AuthenticationForm";

export function AuthenticationTitle(props: PaperProps) {
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
            <a href="/">
              <Image maw={80} src="/logo.svg" alt="Qoaba logo" />
            </a>
          </Center>

          <Space h={30} />

          <AuthenticationForm />
        </Paper>
      </div>
    </Container>
  );
}

export default AuthenticationTitle;
