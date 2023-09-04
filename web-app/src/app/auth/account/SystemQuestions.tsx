import {
  Text,
  createStyles,
  rem,
  Card,
  Textarea,
  Group,
  Divider,
  Button,
  Select,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";
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

function areFieldsDirty(form: any) {
  return (
    form.isDirty("topic") &&
    form.isDirty("question_title") &&
    form.isDirty("question") &&
    form.isDirty("solution") &&
    form.isDirty("difficulty")
  );
}

export function SystemQuestions(props: any) {
  const { classes, theme, cx } = useStyles();

  const form = useForm({
    initialValues: {
      topic: "",
      question_title: "",
      question: "",
      solution: "",
      difficulty: "",

      validate: {
        topic: (val: string) =>
          /^(?!\s*$).+/.test(val) ? null : "Invalid topic",
        question_title: (val: string) =>
          /^(?!\s*$).+/.test(val) ? null : "Invalid question title",
        question: (val: string) =>
          /^(?!\s*$).+/.test(val) ? null : "Invalid question",
        solution: (val: string) =>
          /^(?!\s*$).+/.test(val) ? null : "Invalid solution",
        difficulty: (val: string) =>
          /^(?!\s*$).+/.test(val) ? null : "Invalid difficulty",
      },
    },
  });

  const onSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: form.values.topic,
          question_title: form.values.question_title,
          question: form.values.question,
          solution: form.values.solution,
          difficulty: form.values.difficulty,
        }),
      });

      if (res.ok) {
      } else {
        throw new Error("Error creating user account");
      }
    } catch (error) {}
  };

  const onFail = async () => {
    console.log("Fail");
  };

  return (
    <Card p="lg" shadow="md" className={classes.card}>
      <Text className={classes.cardTitle}>Add a question</Text>

      <form onSubmit={form.onSubmit(() => {})}>
        <Text mt="xl" className={classes.cardDescription}>
          Topic
        </Text>
        <Select
          id="1"
          required
          placeholder="Select a topic"
          mt="sm"
          searchable
          data={["OOP", "Networks", "Algorithms", "Virtualization"]}
          onChange={(value) => form.setFieldValue("topic", value!)}
          error={form.errors.topic}
          variant="filled"
          radius="md"
        />

        <Text mt="md" className={classes.cardDescription}>
          Question Title
        </Text>
        <Textarea
          id="2"
          required
          autosize
          minRows={1}
          placeholder="Enter your question title here..."
          mt="sm"
          onChange={(event) =>
            form.setFieldValue("question_title", event.currentTarget.value)
          }
          error={form.errors.question_title}
          variant="filled"
          radius="md"
        />

        <Text mt="md" className={classes.cardDescription}>
          Question
        </Text>
        <Textarea
          id="3"
          required
          autosize
          minRows={1}
          placeholder="Enter your question here..."
          mt="sm"
          onChange={(event) =>
            form.setFieldValue("question", event.currentTarget.value)
          }
          error={form.errors.question}
          variant="filled"
          radius="md"
        />

        <Text mt="md" className={classes.cardDescription}>
          Solution
        </Text>
        <Textarea
          id="4"
          required
          autosize
          minRows={2}
          placeholder="Enter your solution here..."
          mt="sm"
          onChange={(event) =>
            form.setFieldValue("solution", event.currentTarget.value)
          }
          error={form.errors.solution}
          variant="filled"
          radius="md"
        />

        <Text mt="md" className={classes.cardDescription}>
          Difficulty
        </Text>
        <Select
          id="5"
          required
          placeholder="Select a difficulty"
          mt="sm"
          searchable
          data={["Beginner", "Intermediate", "Advanced"]}
          onChange={(value) => form.setFieldValue("difficulty", value!)}
          error={form.errors.difficulty}
          variant="filled"
          radius="md"
        />

        <Divider mt="lg" mb="lg" />

        <Group position="right">
          <Button
            onClick={areFieldsDirty(form) ? onSubmit : onFail}
            type="submit"
          >
            Add
          </Button>
          <Button type="reset" color="red">
            Clear
          </Button>
        </Group>
      </form>
    </Card>
  );
}
