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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

export function UserPerformance() {
  const { classes, theme, cx } = useStyles();

  const chartData = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        label: "Dataset Label",
        data: [10, 20, 30],
        backgroundColor:
          theme.colorScheme === "dark"
            ? "rgba(255, 99, 132, 0.2)"
            : "rgba(75,192,192,0.2)",
        borderColor:
          theme.colorScheme === "dark"
            ? "rgba(255, 99, 132, 1)"
            : "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },
  };

  return (
    <Card p="lg" shadow="md" radius="md" className={classes.card}>
      <Bar data={chartData} options={chartOptions} />
    </Card>
  );
}
