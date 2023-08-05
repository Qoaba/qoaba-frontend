'use client';

import { createStyles, Text, Button} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    zIndex: 1,
  },
}));

export function Test() {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();

  return (
    <div>
        <Text>
            This is a test component
        </Text>
        <Button>
            Click me!
        </Button>
    </div>
  );
}