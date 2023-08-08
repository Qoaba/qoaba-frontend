"use client";

import {
    createStyles,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
  } from '@mantine/core';
  import { IconChartLine, IconPalette, IconUsersGroup } from '@tabler/icons-react';
  
  const featurePoints = [
    {
      title: 'Actionable insights',
      description:
        'Several data-driven insights identify where your strengths and weaknesses lie, and how you can leverage them to your advantage.',
      icon: IconChartLine,
    },
    {
      title: 'Personalized experience',
      description:
        'Our AI-powered system learns from your behavior and adapts to your needs, providing you with a unique experience.',
      icon: IconPalette,
    },
    {
      title: 'Large community',
      description:
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
  
    description: {
      maxWidth: 600,
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
          {feature.description}
        </Text>
      </Card>
    ));
  
    return (
      <Container size="lg" py="xl">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Master the technical interview one question at a time
        </Title>
  
        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Boost your problem-solving skills and knowledge, empowering confident interviews at any level – from seasoned professionals to those just starting their journey.
        </Text>
  
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }