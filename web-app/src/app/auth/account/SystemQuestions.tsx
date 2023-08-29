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
  Divider,
  Button,
  Select,
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
  { re: /^(?!\s*$).+/, label: "Contains a topic" },
  { re: /^(?!\s*$).+/, label: "Contains a question title" },
  { re: /^(?!\s*$).+/, label: "Contains a question" },
  { re: /^(?!\s*$).+/, label: "Contains a solution" },
  { re: /^(?!\s*$).+/, label: "Contains a difficulty" },
];

export function SystemQuestions({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: string }[];
}) {
  const { classes, theme, cx } = useStyles();

  const [questions, setQuestions] = useState(["", "", "", "", ""]);
  const [strengths, setStrengths] = useState([0, 0, 0, 0, 0]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);

    const newStrengths = [...strengths];
    newStrengths[index] = value === "" ? 0 : 20;
    setStrengths(newStrengths);
  };

  var value = "";
  var strength = 0;
  for (let i = 0; i < questions.length; i++) {
    value += questions[i];
    strength += strengths[i];
  }

  const bars = Array(5)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: "0ms" } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 5) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={5}
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
            <Select
              placeholder="Select a topic"
              mt="sm"
              searchable
              data={["OOP", "Networks", "Algorithms", "Virtualization"]}
              value={questions[index]}
              onChange={(value) => handleQuestionChange(index, value!)}
            />
          )}

          {index === 1 && (
            <Textarea
              autosize
              minRows={1}
              placeholder="Enter your question title here..."
              mt="sm"
              value={questions[index]}
              onChange={(event) =>
                handleQuestionChange(index, event.target.value)
              }
            />
          )}

          {index === 2 && (
            <Textarea
              autosize
              minRows={1}
              placeholder="Enter your question here..."
              mt="sm"
              value={questions[index]}
              onChange={(event) =>
                handleQuestionChange(index, event.target.value)
              }
            />
          )}

          {index === 3 && (
            <Textarea
              autosize
              minRows={2}
              placeholder="Enter your solution here..."
              mt="sm"
              value={questions[index]}
              onChange={(event) =>
                handleQuestionChange(index, event.target.value)
              }
            />
          )}

          {index === 4 && (
            <Select
              placeholder="Select a difficulty"
              mt="sm"
              searchable
              data={["Beginner", "Intermediate", "Advanced"]}
              value={questions[index]}
              onChange={(value) => handleQuestionChange(index, value!)}
            />
          )}
        </React.Fragment>
      ))}
      <div>
        <Group spacing={5} grow mt="xl">
          {bars}
        </Group>
        {requirements.map((requirement, reqIndex) => (
          <QuestionRequirement
            key={reqIndex}
            label={requirement.label}
            meets={requirement.re.test(questions[reqIndex])}
          />
        ))}
      </div>

      <Divider mt="lg" mb="lg" />

      <Group position="right">
        <Button disabled={strength === 100 ? false : true}>
          {" "}
          Add new question
        </Button>
      </Group>
    </Card>
  );
}
