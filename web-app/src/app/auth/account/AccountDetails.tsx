import { Text, createStyles, rem, Card, Divider } from "@mantine/core";
import React from "react";

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

export function AccountDetails({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: string }[];
}) {
  const { classes, theme, cx } = useStyles();

  return (
    <Card p="lg" shadow="md" className={classes.card}>
      <Text className={classes.cardTitle}>{title}</Text>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <Text
            mt={index === 0 ? "xl" : "md"}
            className={classes.cardDescription}
          >
            {field.label}
          </Text>

          <Text
            c={index > 1 ? "dimmed" : ""}
            className={
              index > 1
                ? classes.cardLesserDescription
                : classes.cardDescription
            }
          >
            {field.value}
          </Text>
          {index < fields.length - 1 && <Divider mt="md" />}
        </React.Fragment>
      ))}
    </Card>
  );
}
