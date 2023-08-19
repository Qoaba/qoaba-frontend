"use client"

import { Stack, Anchor, Button, Group, TextInput, PasswordInput, createStyles, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";



export default function SignInForm(props: any) {

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
        <form onSubmit={form.onSubmit(() => { })}>
            <Stack>
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

                <PasswordInput
                    required
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
                    radius="md"
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
                    "Don't have an account? Create an account"
                </Anchor>
                <Button onClick={onSubmit} type="submit" radius="xl">
                    Sign Up
                </Button>
            </Group>
        </form>
    )
}
