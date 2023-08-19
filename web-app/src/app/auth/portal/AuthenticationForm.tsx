import { Divider, Group, Title, createStyles, rem } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { GoogleButton } from "./GoogleButton";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: rem(20),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6],
  },

  card: {
    border: "none",
  },
}));

export default function AuthenticationForm(props: any) {
  const [type, toggle] = useToggle(["sign in", "sign up"]);

  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title}>
        {type === "sign up" ? "Create an account" : "Sign in to your account"}
      </Title>
      <Group grow mb="md" mt="md">
        <GoogleButton radius="lg" className={classes.card}>
          Google
        </GoogleButton>
      </Group>
      <Divider label="Or continue with email" labelPosition="center" my="lg" />
      {type === "sign in" && <SignInForm toggle={toggle} />}
      {type === "sign up" && <SignUpForm toggle={toggle} />}
    </>
  );
}
