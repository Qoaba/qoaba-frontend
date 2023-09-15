import React, { useState } from "react";
import { Card, createStyles, Center } from "@mantine/core";
import { IconVolume2 } from "@tabler/icons-react"; // Import IconVolume2

const useStyles = createStyles((theme) => ({
  card: {
    cursor: "pointer",
    perspective: "1000px",
    transition: "transform 0.5s",
    height: "300px",
    position: "relative",
  },

  flipped: {
    transform: "rotateY(180deg)",
  },

  cardContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    transformStyle: "preserve-3d",
    position: "relative", // Add this to ensure position context for the icon
  },

  backFace: {
    transform: "rotateY(180deg)",
  },

  voiceButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    display: "none",
  },

  iconVolume: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "20px",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
}));

export function FeaturesCard({ questionData }: { questionData: any }) {
  const { classes } = useStyles();
  const [isFlipped, setFlipped] = useState(false);

  const toggleCard = () => {
    setFlipped(!isFlipped);
  };

  const cardClass = `${classes.card} ${isFlipped ? classes.flipped : ""}`;

  const speakText = () => {
    const textToRead = questionData.data
      .map((question: any) =>
        isFlipped ? question.solution : question.question
      )
      .join(" ");
    const speech = new SpeechSynthesisUtterance(textToRead);
    window.speechSynthesis.speak(speech);
  };

  const handleIconClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent the click event from propagating to the card
    speakText(); // Trigger the text-to-speech when the icon is clicked
  };

  return (
    <Card className={cardClass} onClick={toggleCard}>
      <div className={`${classes.cardContent} ${isFlipped ? classes.backFace : ""}`}>
        <Center>
          {questionData.data.map((question: any, index: number) => (
            <div key={index}>
              {isFlipped ? question.solution : question.question}
            </div>
          ))}
        </Center>
        <div className={classes.iconVolume} onClick={handleIconClick}>
          <IconVolume2 />
        </div>
      </div>
    </Card>
  );
}
