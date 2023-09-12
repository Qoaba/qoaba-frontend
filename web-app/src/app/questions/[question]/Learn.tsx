import React, { useState } from 'react';
import { Card, createStyles, Center } from '@mantine/core';

const useStyles = createStyles(() => ({
  card: {
    cursor: 'pointer',
    perspective: '1000px', // Enable 3D perspective for the flip effect
    transition: 'transform 0.5s', // Add a transition for the flip effect
    height: '300px', // Adjust the height as needed
  },

  flipped: {
    transform: 'rotateY(180deg)', // Rotate the card 180 degrees when flipped
  },

  cardContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column', // Use a column layout to display questions and solutions vertically
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    transformStyle: 'preserve-3d', // Add this to ensure text is not reversed
  },

  backFace: {
    transform: 'rotateY(180deg)', // Rotate the card content to show the back face
  },
}));

export function FeaturesCard({ questionData }: { questionData: any }) {
  const { classes } = useStyles();
  const [isFlipped, setFlipped] = useState(false);

  const toggleCard = () => {
    setFlipped(!isFlipped);
  };

  const cardClass = `${classes.card} ${isFlipped ? classes.flipped : ''}`;

  return (
    <Card className={cardClass} onClick={toggleCard}>
      <div className={`${classes.cardContent} ${isFlipped ? classes.backFace : ''}`}>
        <Center>
          {questionData.data.map((question: any, index: number) => (
            <div key={index}>
              {isFlipped ? question.solution : question.question}
            </div>
          ))}
        </Center>
      </div>
    </Card>
  );
}
