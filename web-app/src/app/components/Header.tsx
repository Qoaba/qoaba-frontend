"use client";

import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  rem,
  Image
} from '@mantine/core';

import { ColorSchemeToggle } from './ToggleColorScheme';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.md,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));


export function HeaderMegaMenu() {
  const { classes, theme } = useStyles();

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          
          {theme.colorScheme === 'dark' ? (<Image maw={120} src="./logo-text-darkmode.svg" />) : <Image maw={120} src="./logo-text-lightmode.svg" />}

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href="../questions" className={classes.link}>
              Questions
            </a>
            <a href="#" className={classes.link}>
              Analysis
            </a>
            <a href="#" className={classes.link}>
              Pricing
            </a>
          </Group>

          <Group classNames={classes.hiddenMobile}>
            <Button
              component="a" 
              href="./../auth/signIn">Account</Button>
            <ColorSchemeToggle />
          </Group>
          
        </Group>
      </Header>
    </Box>
  );
}
