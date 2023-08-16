"use client";

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
  Button,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
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
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
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
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
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
    { link: "", label: "Notifications", icon: IconBellRinging },
    { link: "", label: "Billing", icon: IconReceipt2 },
    { link: "", label: "Security", icon: IconFingerprint },
    { link: "", label: "SSH Keys", icon: IconKey },
    { link: "", label: "Databases", icon: IconDatabaseImport },
    { link: "", label: "Authentication", icon: Icon2fa },
    { link: "", label: "Other Settings", icon: IconSettings },
  ],
  general: [
    { link: "", label: "Orders", icon: IconShoppingCart },
    { link: "", label: "Receipts", icon: IconLicense },
    { link: "", label: "Reviews", icon: IconMessage2 },
    { link: "", label: "Messages", icon: IconMessages },
    { link: "", label: "Customers", icon: IconUsers },
    { link: "", label: "Refunds", icon: IconReceiptRefund },
    { link: "", label: "Files", icon: IconFileAnalytics },
  ],
};

export const Account = () => {
  const { classes, theme, cx } = useStyles();
  const [section, setSection] = useState<"account" | "general">("account");
  const [active, setActive] = useState("Billing");
  const { data: session } = useSession();

  const links = tabs[section].map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
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
              {session?.user?.email}
            </Text>

            <SegmentedControl
              value={section}
              onChange={(value: "account" | "general") => setSection(value)}
              transitionTimingFunction="ease"
              fullWidth
              data={[
                { label: "Account", value: "account" },
                { label: "System", value: "general" },
              ]}
            />
          </Navbar.Section>

          <Navbar.Section grow mt="xl">
            {links}

            <div style={{ marginTop: "1rem" }}>
              <a
                href="/"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
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
            <Card p="lg" className={classes.card}>
              <Text className={classes.cardTitle}>Your account</Text>

              <Text mt="xl" className={classes.cardDescription}>
                Username
              </Text>
              <Text className={classes.cardDescription}>
                {session?.user?.name}
              </Text>

              <Divider mt="md" />

              <Text mt="md" className={classes.cardDescription}>
                Email
              </Text>
              <Text className={classes.cardDescription}>
                {session?.user?.email}
              </Text>

              <Divider mt="md" />

              <Text mt="md" className={classes.cardDescription}>
                Password
              </Text>
              <Text c="dimmed" className={classes.cardLesserDescription}>
                Change your account password.
              </Text>

              <Divider mt="md" />

              <Text mt="md" className={classes.cardDescription}>
                Delete account
              </Text>
              <Text c="dimmed" className={classes.cardLesserDescription}>
                Permanently delete your account, and associated subscriptions.
                You will be asked for confirmation before the deletion proceeds.
              </Text>
            </Card>
          </SimpleGrid>
        </div>
      </div>
    </Center>
  );
};

export default Account;
