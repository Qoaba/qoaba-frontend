import {
  Modal,
  Text,
  createStyles,
  rem,
  Card,
  Divider,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { StatsRing } from "./StatsRing";

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

  buttonLabel: {
    fontSize: rem(14),
  },

  modalDialogue: {
    border: "2px solid #ccc",
  },
}));

export function UserPerformance({ params }: { params: { userId: string } }) {
  const { classes, theme, cx } = useStyles();
  const [statData, setStatData] = useState<any>(null);

  useEffect(() => {
    const apiUrl = `http://localhost:8000/api/stats/${params.userId}/attempts`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStatData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.userId]);

  return (
    <>
      <StatsRing params={{ stats: statData }} />
      <Card p="lg" shadow="md" radius="md" className={classes.card}>
        <></>
      </Card>
    </>
  );
}
