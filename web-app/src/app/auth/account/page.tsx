"use client";

import { IUser } from "./../../types/index";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  Navbar,
  SegmentedControl,
  Text,
  createStyles,
  getStylesRef,
  rem,
  Center,
  Card,
  SimpleGrid,
  Divider,
  Transition,
} from "@mantine/core";
import {
  IconBolt,
  IconUser,
  IconReceipt2,
  IconLogout,
  IconArrowNarrowLeft,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderRight: "none",
  },

  title: {
    textTransform: "uppercase",
    letterSpacing: rem(-0.25),
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  logoutLink: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.colors.red[6],
      color: theme.white,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.white,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "dark",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "dark", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "dark", color: theme.primaryColor })
          .color,
      },
    },
  },

  card: {
    border: "none",
  },

  cardTitle: {
    fontWeight: 700,
    fontSize: rem(30),
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  cardDescription: {
    fontSize: rem(18),
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  cardLesserDescription: {
    fontSize: rem(16),
  },
}));

const tabs = {
  account: [
    { label: "Details", icon: IconUser },
    { label: "Billing", icon: IconReceipt2 },
  ],
  general: [{ label: "Performance", icon: IconBolt }],
};

export const Account = () => {
  const { classes, theme, cx } = useStyles();
  const [section, setSection] = useState<"account" | "general">("account");
  const [active, setActive] = useState("Details");
  const { data: session } = useSession();
  const userInstance = session?.user as IUser;

  const links = tabs[section].map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Center mt="xl">
      <div style={{ display: "flex" }}>
        <Navbar
          height={840}
          width={{ sm: 300 }}
          p="md"
          className={classes.navbar}
        >
          <Navbar.Section>
            <Text
              weight={500}
              size="sm"
              className={classes.title}
              color="dimmed"
              mb="xs"
            >
              {userInstance?.email}
            </Text>

            <SegmentedControl
              value={section}
              onChange={(value: "account" | "general") => setSection(value)}
              transitionTimingFunction="ease"
              fullWidth
              data={[
                { label: "Account", value: "account" },
                { label: "Statistics", value: "general" },
              ]}
            />
          </Navbar.Section>

          <Navbar.Section grow mt="xl">
            {links}

            <div style={{ marginTop: "2rem" }}>
              <a href="/" className={classes.link}>
                <IconArrowNarrowLeft
                  className={classes.linkIcon}
                  stroke={1.5}
                />
                <span>Back to main site</span>
              </a>

              <a
                className={classes.logoutLink}
                onClick={async (event) => {
                  event.preventDefault();
                  await signOut({
                    callbackUrl: "/auth/signIn",
                  });
                }}
              >
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Log out</span>
              </a>
            </div>
          </Navbar.Section>
        </Navbar>

        <div style={{ flex: 1, padding: "1rem" }}>
          <SimpleGrid w={750} cols={1} spacing="lg">
            <Transition
              mounted={active === "Details"}
              transition="fade"
              duration={150}
              timingFunction="ease"
            >
              {(styles) => (
                <div style={styles}>
                  {active != "" && (
                    <>
                      <Card p="lg" shadow="md" className={classes.card}>
                        <Text className={classes.cardTitle}>Your account</Text>

                        <Text mt="xl" className={classes.cardDescription}>
                          Username
                        </Text>
                        <Text className={classes.cardDescription}>
                          {userInstance?.username}
                        </Text>

                        <Divider mt="md" />

                        <Text mt="md" className={classes.cardDescription}>
                          Email
                        </Text>
                        <Text className={classes.cardDescription}>
                          {userInstance?.email}
                        </Text>

                        <Divider mt="md" />

                        <Text mt="md" className={classes.cardDescription}>
                          ID
                        </Text>
                        <Text className={classes.cardDescription}>
                          {userInstance?._id}
                        </Text>

                        <Divider mt="md" />

                        <Text mt="md" className={classes.cardDescription}>
                          Password
                        </Text>
                        <Text
                          c="dimmed"
                          className={classes.cardLesserDescription}
                        >
                          Change your account password.
                        </Text>

                        <Divider mt="md" />

                        <Text mt="md" className={classes.cardDescription}>
                          Delete account
                        </Text>
                        <Text
                          c="dimmed"
                          className={classes.cardLesserDescription}
                        >
                          Permanently delete your account, and associated
                          subscriptions. You will be asked for confirmation
                          before the deletion proceeds.
                        </Text>
                      </Card>
                    </>
                  )}
                </div>
              )}
            </Transition>
          </SimpleGrid>
        </div>
      </div>
    </Center>
  );
};

export default Account;
