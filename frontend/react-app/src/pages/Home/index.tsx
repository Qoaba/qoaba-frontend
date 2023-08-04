import { Button, Stack, Text } from '@mantine/core';

export function Home() {
    return (
        <Stack align="center" mt={50}>
            <Text align="center" size="lg">Welcome to Mantine!</Text>
            <Button variant="outline" color="blue">Get started</Button>
        </Stack>
    );
}