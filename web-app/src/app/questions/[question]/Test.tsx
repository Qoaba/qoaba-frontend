import {
  Text,
  createStyles,
  rem,
  Card,
  Textarea,
  Group,
  Divider,
  Button,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";

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

export function SystemQuestions({ questionData }: { questionData: any }) {
  const { classes, theme, cx } = useStyles();

  const form = useForm({
    initialValues: {
      answer: "",
    },
  });

  const [isCorrect, setIsCorrect] = useState(false);

  const onSubmit = () => {
    // Your logic to determine correctness goes here
    // For demonstration purposes, we'll consider it correct
    setIsCorrect(true);
  };

  console.log("questionData:", questionData);

  return (
    <Card p="lg" shadow="md" className={classes.card}>
      {questionData.data.map((question: any) => (
        <div key={question.id}>
          <Text className={classes.cardTitle}>{question.question}</Text>
          
          <Text mt="md" className={classes.cardDescription}>
            Enter your answer below:
          </Text>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.onSubmit(() => {
                onSubmit();
              })();
            }}
          >
            <Textarea
              id="2"
              required
              autosize
              minRows={1}
              placeholder="Enter your answer here..."
              mt="sm"
              onChange={(event) =>
                form.setFieldValue("answer", event.currentTarget.value)
              }
              variant="filled"
              radius="md"
            />

            <Divider mt="lg" mb="lg" />

            <Group position="right">
              <Button type="submit">Submit</Button>
              <Button type="reset" color="red">
                Clear
              </Button>
            </Group>
          </form>

          {isCorrect && (
            <Text mt="md" color="teal">
              Correct
            </Text>
          )}
        </div>
      ))}
    </Card>
  );
}
