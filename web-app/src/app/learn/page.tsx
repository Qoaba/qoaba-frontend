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
        "name": "Athena Weissnat",
        "company": "Little - Rippin",
        "email": "Elouise.Prohaska@yahoo.com"
      },
      {
        "name": "Deangelo Runolfsson",
        "company": "Greenfelder - Krajcik",
        "email": "Kadin_Trantow87@yahoo.com"
      },
      {
        "name": "Danny Carter",
        "company": "Kohler and Sons",
        "email": "Marina3@hotmail.com"
      },
      {
        "name": "Trace Tremblay PhD",
        "company": "Crona, Aufderhar and Senger",
        "email": "Antonina.Pouros@yahoo.com"
      },
      {
        "name": "Derek Dibbert",
        "company": "Gottlieb LLC",
        "email": "Abagail29@hotmail.com"
      },
      {
        "name": "Viola Bernhard",
        "company": "Funk, Rohan and Kreiger",
        "email": "Jamie23@hotmail.com"
      },
      {
        "name": "Austin Jacobi",
        "company": "Botsford - Corwin",
        "email": "Genesis42@yahoo.com"
      },
      {
        "name": "Hershel Mosciski",
        "company": "Okuneva, Farrell and Kilback",
        "email": "Idella.Stehr28@yahoo.com"
      },
      {
        "name": "Mylene Ebert",
        "company": "Kirlin and Sons",
        "email": "Hildegard17@hotmail.com"
      },
      {
        "name": "Lou Trantow",
        "company": "Parisian - Lemke",
        "email": "Hillard.Barrows1@hotmail.com"
      },
      {
        "name": "Dariana Weimann",
        "company": "Schowalter - Donnelly",
        "email": "Colleen80@gmail.com"
      },
      {
        "name": "Dr. Christy Herman",
        "company": "VonRueden - Labadie",
        "email": "Lilyan98@gmail.com"
      },
      {
        "name": "Katelin Schuster",
        "company": "Jacobson - Smitham",
        "email": "Erich_Brekke76@gmail.com"
      },
      {
        "name": "Melyna Macejkovic",
        "company": "Schuster LLC",
        "email": "Kylee4@yahoo.com"
      },
      {
        "name": "Pinkie Rice",
        "company": "Wolf, Trantow and Zulauf",
        "email": "Fiona.Kutch@hotmail.com"
      },
      {
        "name": "Brain Kreiger",
        "company": "Lueilwitz Group",
        "email": "Rico98@hotmail.com"
      }
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
        <Grid.Col span={6}>
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
