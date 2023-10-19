import {
  RingProgress,
  Text,
  SimpleGrid,
  Card,
  Center,
  Group,
} from "@mantine/core";

interface StatsObject {
  solved: {
    Beginner: number;
    Intermediate: number;
    Advanced: number;
  };
  total: {
    Beginner: number;
    Intermediate: number;
    Advanced: number;
  };
}

export function StatsRing({ params }: { params: { stats: object } }) {
  const statsObject = params.stats as StatsObject;
  if (statsObject == null) {
    return;
  }
  const data = [
    {
      label: "Beginner",
      stats: statsObject.solved.Beginner.toString(),
      progress:
        (statsObject.solved.Beginner / statsObject.total.Beginner) * 100,
      color: "teal",
    },
    {
      label: "Intermediate",
      stats: statsObject.solved.Intermediate.toString(),
      progress:
        (statsObject.solved.Intermediate / statsObject.total.Intermediate) *
        100,
      color: "yellow",
    },
    {
      label: "Advanced",
      stats: statsObject.solved.Advanced.toString(),
      progress:
        (statsObject.solved.Advanced / statsObject.total.Advanced) * 100,
      color: "red",
    },
  ] as const;

  const stats = data.map((stat) => {
    return (
      <Card radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Text size="xs" fw={700}>
                  {stat.progress}%{" "}
                </Text>
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Card>
    );
  });

  return <SimpleGrid cols={3}>{stats}</SimpleGrid>;
}
