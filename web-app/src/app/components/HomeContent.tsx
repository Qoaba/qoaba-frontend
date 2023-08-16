"use client";

import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  Space,
  Button,
  Group,
} from "@mantine/core";
import {
  IconChartLine,
  IconPalette,
  IconUsersGroup,
} from "@tabler/icons-react";

const featurePoints = [
  {
    title: "Actionable insights",
    cardDescription:
      "Several data-driven insights identify where your strengths and weaknesses lie, and how you can leverage them to your advantage.",
    icon: IconChartLine,
  },
  {
    title: "Personalized experience",
    cardDescription:
      "Our AI-powered system learns from your behavior and adapts to your needs, providing you with a unique experience.",
    icon: IconPalette,
  },
  {
    title: "Large community",
    cardDescription:
      "Discover a wide range of questions and solutions in our expansive collection of community-driven content, and contribute your own.",
    icon: IconUsersGroup,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  titleDescription: {
    maxWidth: 800,
    fontWeight: 500,
    fontSize: rem(24),
  },

  cardDescription: {
    maxWidth: 700,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: "none",
  },

  cardTitle: {
    fontWeight: 500,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const features = featurePoints.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.cardDescription}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={1} className={classes.title} ta="left">
        Master the technical interview.
      </Title>
      <Text c="dimmed" className={classes.titleDescription} ta="left" mt="md">
        Qoaba is the comprehensive platform for technical interview prepartion
        that adapts to your unique learning style.
      </Text>
      <Group>
        <Button size="lg" mt="md">
          Get started
        </Button>
        <Button size="lg" variant="outline" mt="md">
          Learn more
        </Button>
      </Group>

      <Space h={120} />

      <Title order={1} className={classes.title} ta="left" mt="sm">
        Learn effectively.
      </Title>
      <Text c="dimmed" className={classes.titleDescription} ta="left" mt="md">
        Boost your problem-solving skills and knowledge, empowering you with
        confidence for interviews at any level – from seasoned professionals to
        those just starting their journey.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
