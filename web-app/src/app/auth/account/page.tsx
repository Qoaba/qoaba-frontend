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
  SimpleGrid,
  Loader,
  Container,
  Image,
  Group,
} from "@mantine/core";
import {
  IconBolt,
  IconUser,
  IconReceipt2,
  IconLogout,
  IconArrowNarrowLeft,
  IconDatabaseEdit,
} from "@tabler/icons-react";
import { AccountDetails } from "./AccountDetails";
import { SystemQuestions } from "./SystemQuestions";

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
}));

export const Account = () => {
  const { classes, theme, cx } = useStyles();
  const [section, setSection] = useState<"account" | "general">("account");
  const [active, setActive] = useState("Details");
  const { data: session } = useSession();

  if (!session) {
    return (
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Loader size="xl" />
      </Container>
    );
  }

  var tabs = null;
  var tabLabels = null;
  if (session.user.role === "admin") {
    tabs = {
      account: [{ label: "Details", icon: IconUser }],
      general: [{ label: "Questions", icon: IconDatabaseEdit }],
    };

    tabLabels = [
      { label: "Account", value: "account" },
      { label: "System", value: "general" },
    ];
  } else if (session.user.role === "user") {
    tabs = {
      account: [
        { label: "Details", icon: IconUser },
        { label: "Billing", icon: IconReceipt2 },
      ],
      general: [{ label: "Performance", icon: IconBolt }],
    };

    tabLabels = [
      { label: "Account", value: "account" },
      { label: "Statistics", value: "general" },
    ];
  }

  const links = tabs![section].map((item) => (
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

  const detailsFields = [
    { label: "Username", value: session.user.name },
    { label: "Email", value: session.user.email },
    {
      label: "Password",
      value: "Change your account password.",
    },
    {
      label: "Delete account",
      value:
        "Permanently delete your account, and associated subscriptions. You will be asked for confirmation before the deletion proceeds.",
    },
  ];

  const questionsFields = [
    { label: "Question", value: "Your question" },
    { label: "Answer", value: "Your answer" },
  ];

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
            <Group style={{ display: "flex", alignItems: "center" }} mb="xl">
              <Image
                src={session.user.image}
                radius="sm"
                alt="Profile picture"
                width={40}
                height={40}
              />
              <Text
                weight={500}
                size="sm"
                color="dimmed"
                className={classes.title}
                style={{ marginLeft: "0.1rem" }}
              >
                {session.user.role}
              </Text>
            </Group>

            <SegmentedControl
              value={section}
              onChange={(value: "account" | "general") => setSection(value)}
              transitionTimingFunction="ease"
              fullWidth
              data={tabLabels!}
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
                    callbackUrl: "/auth/portal",
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
            {active === "Details" && (
              <>
                <AccountDetails title="Your account" fields={detailsFields} />
              </>
            )}

            {active === "Questions" && (
              <>
                <SystemQuestions
                  title="Add a question"
                  fields={questionsFields}
                />
              </>
            )}
          </SimpleGrid>
        </div>
      </div>
    </Center>
  );
};

export default Account;
