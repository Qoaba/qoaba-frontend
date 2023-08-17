"use client";

import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  rem,
  Image,
} from "@mantine/core";

import { ColorSchemeToggle } from "./ToggleColorScheme";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    fontWeight: 500,
    fontSize: theme.fontSizes.md,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderMegaMenu() {
  const { classes, theme } = useStyles();
  const { data: session } = useSession();

  return (
    <Box pb={120}>
      <Header height={60} px="md" withBorder={false}>
        <Group position="apart" sx={{ height: "100%" }}>
          {theme.colorScheme === "dark" ? (
            <Image
              maw={120}
              src="./logo-text-darkmode.svg"
              alt="Darkmode Qoaba logo with text"
            />
          ) : (
            <Image
              maw={120}
              src="./logo-text-lightmode.svg"
              alt="Lightmode Qoaba logo with text"
            />
          )}

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
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

          <Group sx={{ height: "100%" }} classNames={classes.hiddenMobile}>
            <a
              href={session ? "/auth/account" : "/auth/signIn"}
              className={classes.link}
            >
              Account
            </a>
            <ColorSchemeToggle />
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
