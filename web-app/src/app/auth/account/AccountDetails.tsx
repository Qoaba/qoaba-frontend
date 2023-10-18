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
import { useSession } from "next-auth/react";
import React from "react";
import { ModelOverlay } from "./ModalOverlay";

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

export function AccountDetails({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: string }[];
}) {
  const { classes, theme, cx } = useStyles();
  const [openedModals, setOpenedModals] = React.useState<boolean[]>(
    Array(fields.length).fill(false)
  );

  const openModal = (index: number) => {
    const updatedOpenedModals = [...openedModals];
    updatedOpenedModals[index] = true;
    setOpenedModals(updatedOpenedModals);
  };

  const closeModal = (index: number) => {
    const updatedOpenedModals = [...openedModals];
    updatedOpenedModals[index] = false;
    setOpenedModals(updatedOpenedModals);
  };

  const { data: session } = useSession();

  return (
    <Card p="lg" shadow="md" radius="md" className={classes.card}>
      <Text className={classes.cardTitle}>{title}</Text>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <Text
            mt={index === 0 ? "xl" : "md"}
            className={classes.cardDescription}
          >
            {field.label}
          </Text>

          <Group position="apart">
            <Box w={600}>
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
            </Box>
            <Button
              key={index}
              style={{
                background:
                  index < 3 ? theme.colors.dark[3] : theme.colors.red[6],
              }}
              onClick={() => openModal(index)}
              disabled={session?.user.type === "oauth" && index < 3}
            >
              <Text className={classes.buttonLabel}>
                {index < 3 ? "Change" : "Delete"}
              </Text>
            </Button>
          </Group>

          <Modal
            opened={openedModals[index]}
            onClose={() => closeModal(index)}
            title={
              index < 3
                ? "Change your " + field.label.toLowerCase()
                : "Delete your account"
            }
            centered
            size="md"
            radius="md"
          >
            <ModelOverlay index={index} manipulateModal={closeModal} />
          </Modal>
          {index < fields.length - 1 && <Divider mt="md" />}
        </React.Fragment>
      ))}
    </Card>
  );
}
