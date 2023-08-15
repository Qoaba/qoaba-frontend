import { GoogleIcon } from './GoogleIcon';
import { Button, ButtonProps, Group } from '@mantine/core';

export function GoogleButton(props: ButtonProps) {
    return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}