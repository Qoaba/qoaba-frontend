import {
  Text,
  createStyles,
  rem,
  Card,
  Textarea,
  Center,
  Box,
  Progress,
  Group,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
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

function QuestionRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size="0.9rem" stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /^(?!\s*$).+/, label: "Contains a question" },
  { re: /^(?!\s*$).+/, label: "Contains an answer" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function SystemQuestions({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: string }[];
}) {
  const { classes, theme, cx } = useStyles();

  const [questions, setQuestions] = useState(["", ""]);
  const [strengths, setStrengths] = useState([0, 0]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);

    const newStrengths = [...strengths];
    newStrengths[index] = getStrength(value);
    setStrengths(newStrengths);
  };

  const value = questions[0] + questions[1];
  const strength = getStrength(value);

  const bars = Array(2)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: "0ms" } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 2) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={2}
      />
    ));

  return (
    <Card p="lg" shadow="md" className={classes.card}>
      <Text className={classes.cardTitle}>{title}</Text>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <Text
            mt={index === 0 ? "xl" : "md"}
            className={classes.cardDescription}
          >
            {field.value}
          </Text>

          {index === 0 && (
            <Textarea
              autosize
              minRows={1}
              placeholder="Enter your question here..."
              mt="md"
              value={questions[index]}
              onChange={(event) =>
                handleQuestionChange(index, event.target.value)
              }
            />
          )}

          {index === 1 && (
            <Textarea
              autosize
              minRows={2}
              placeholder="Enter your answer here..."
              mt="md"
              value={questions[index]}
              onChange={(event) =>
                handleQuestionChange(index, event.target.value)
              }
            />
          )}
        </React.Fragment>
      ))}
      <div>
        <Group spacing={2} grow mt="xl">
          {bars}
        </Group>
        {requirements.map((requirement, reqIndex) => (
          <QuestionRequirement
            key={reqIndex}
            label={requirement.label}
            meets={requirement.re.test(questions[0])}
          />
        ))}
      </div>
    </Card>
  );
}
