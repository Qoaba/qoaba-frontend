import { Container, Title, Accordion, createStyles, rem, Card } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
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

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

  export function FaqSimple({ questionData }: { questionData: any }) {
    const { classes } = useStyles();
  
    return (
      <Card p="lg" shadow="md" className={classes.card}>
        <Accordion variant="separated">
          {questionData.data.map((question: any) => (
            <Accordion.Item className={classes.item} key={question.id} value={question.id}>
              <Accordion.Control>{question.question}</Accordion.Control>
              <Accordion.Panel>{question.solution}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    );
  }