"use client";

import React from 'react';
import { HeaderMegaMenu } from './Header';
import { TableSort } from './Table';
import { Grid } from '@mantine/core';
import { ProgressCardColored } from './ProgressCard';
import { StatsRingCard } from './StatsCard';
import { CardsCarousel } from './Carousel';
import { FooterLinks } from '../components/Footer';

const data = [
      {
        "topic": "OOP",
        "difficulty": "Beginner",
        "question": "OOP concepts"
      },
      {
        "topic": "Networks",
        "difficulty": "Intermediate",
        "question": "TCP/IP compairson"
      },
      {
        "topic": "Algorithms",
        "difficulty": "Advanced",
        "question": "linear programming implementations"
      },
];

const test = [{
  "title": "Project tasks",
  "completed": 1887,
  "total": 2334,
  "stats": [
    {
      "value": 447,
      "label": "Remaining"
    },
    {
      "value": 76,
      "label": "In progress"
    }
  ]
}];

const footerData = [
  {
    title: 'Products',
    links: [
      { label: 'Feature 1', link: '#' },
      { label: 'Feature 2', link: '#' },
      // Add more links as needed
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', link: '#' },
      { label: 'Tutorials', link: '#' },
      // Add more links as needed
    ],
  },
  // Add more groups as needed
];  

export default function Page() {
  return (
    <div>
      <HeaderMegaMenu />
      <Grid gutterMd={0}>
        <Grid.Col span="auto"></Grid.Col>
        <Grid.Col span={5}>
          <CardsCarousel /> {/* No padding here */}
          <div style={{ marginTop: '20px' }}>
            <TableSort data={data} /> {/* No padding here */}
          </div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div style={{ marginLeft: '20px', marginRight: '20px' }}> {/* Padding on left and right */}
            <StatsRingCard
              title={test[0].title}
              total={test[0].total}
              completed={test[0].completed}
              stats={test[0].stats}
            />
          </div>
          <div style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}> {/* Padding on left and right */}
            <ProgressCardColored />
          </div>
        </Grid.Col>
        <Grid.Col span="auto"></Grid.Col>
      </Grid>
      <FooterLinks data={footerData} />
    </div>
  );
}
