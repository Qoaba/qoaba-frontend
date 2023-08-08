"use client";

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    createStyles,
    TextInput,
    PasswordInput,
    Text,
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
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import PasswordStrength from './PasswordStrength';
const useStyles = createStyles((theme) => ({

    title: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: rem(20),
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
            textAlign: 'left',
        },
    },
    highlight: {
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
    },
}));

export function AuthenticationTitle(props: PaperProps) {

    const { classes } = useStyles();
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    return (

        <Container size={420} mt={200} >

            <Paper radius="md" p="xl" withBorder {...props}>
                <Title className={classes.title}>
                    Welcome to{' '}
                    <Text component="span" className={classes.highlight} inherit>
                        Qoaba,
                    </Text>{' '}
                    {type} with
                </Title>

                <Group grow mb="md" mt="md">
                    <GoogleButton radius="lg">Google</GoogleButton>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit(() => { })}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Username"
                                placeholder="Username"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="Your email"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        {type !== 'register' && (<PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />
                        )}

                        {type === 'register' && (
                            <PasswordStrength />
                        )}

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
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
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}

export default AuthenticationTitle;