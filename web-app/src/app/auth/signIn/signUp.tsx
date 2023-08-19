"use client"

import { Anchor, Button, Checkbox, Group, Stack, TextInput } from "@mantine/core";
import PasswordStrength from "./PasswordStrength";
import { useForm } from "@mantine/form";

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

    return (
        <form onSubmit={form.onSubmit(() => { })}>
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


                <PasswordStrength />
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
                    size="xs">
                    Already have an account? Sign in
                </Anchor>
                <Button type="submit" radius="xl">
                    Sign Up
                </Button>
            </Group>
        </form>
    )
}