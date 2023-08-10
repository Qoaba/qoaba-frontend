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
    Accordion,
    Group
  } from '@mantine/core';
  import { IconChartLine, IconPalette, IconUsersGroup } from '@tabler/icons-react';
  
  const featurePoints = [
    {
      title: 'Actionable insights',
      cardDescription:
        'Several data-driven insights identify where your strengths and weaknesses lie, and how you can leverage them to your advantage.',
      icon: IconChartLine,
    },
    {
      title: 'Personalized experience',
      cardDescription:
        'Our AI-powered system learns from your behavior and adapts to your needs, providing you with a unique experience.',
      icon: IconPalette,
    },
    {
      title: 'Large community',
      cardDescription:
        'Discover a wide range of questions and solutions in our expansive collection of community-driven content, and contribute your own.',
      icon: IconUsersGroup,
    },
  ];
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: rem(34),
      fontWeight: 900,
  
      [theme.fn.smallerThan('sm')]: {
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
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: rem(45),
        height: rem(2),
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
      border: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: rem(45),
        height: rem(2),
        marginTop: theme.spacing.sm,
      },
    },

    faqTitle: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontSize: rem(24),
      fontWeight: 900,

      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(16),
      },
    },

    item: {
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing.lg,
      border: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  }));

  export function FeaturesCards() {
    const { classes, theme } = useStyles();
    const features = featurePoints.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
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
          Qoaba is the comprehensive platform for technical interview prepartion that adapts to your unique learning style.
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
          Boost your problem-solving skills and knowledge, empowering you with confidence for interviews at any level – from seasoned professionals to those just starting their journey.
        </Text>
  
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]} >
          {features}
        </SimpleGrid>

        <Space h={120} />

        <Title order={1} className={classes.faqTitle} ta="center" mt="sm">
          Frequently Asked Questions.
        </Title>
        <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>How can I reset my password?</Accordion.Control>
          <Accordion.Panel></Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>Can I create more that one account?</Accordion.Control>
          <Accordion.Panel></Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
          <Accordion.Panel></Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>Do you store credit card information securely?</Accordion.Control>
          <Accordion.Panel></Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>What payment systems to you work with?</Accordion.Control>
          <Accordion.Panel></Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      </Container>
    );
  }