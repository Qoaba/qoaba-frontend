"use client";

import React, { useState, useEffect } from "react";
import { HeaderMegaMenu } from "./Header";
import { Grid, Text } from "@mantine/core";
import { ProgressCardColored } from "./ProgressCard";
import { StatsRingCard } from "./StatsCard";
import { CardsCarousel } from "./Carousel";
import { FooterLinks } from "../components/Footer";
import { TableSort } from "./Table";

interface ApiDataItem {
  id: string;
  topic: string;
  difficulty: string;
  question_title: string;
  question: string;
  solution: string;
}

export default function Page() {
  const [apiData, setApiData] = useState<ApiDataItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/questions") // Change the URL to your API endpoint
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const tableData = apiData.map((item) => ({
    id: item.id,
    topic: item.topic,
    difficulty: item.difficulty,
    question: item.question,
    question_title: item.question_title,
    solution: item.solution,
  }));

  const test = [
    {
      title: "Project tasks",
      completed: 1887,
      total: 2334,
      stats: [
        {
          value: 447,
          label: "Remaining",
        },
        {
          value: 76,
          label: "In progress",
        },
      ],
    },
  ];

  const footerData = [
    {
      title: "Products",
      links: [
        { label: "Feature 1", link: "#" },
        { label: "Feature 2", link: "#" },
        // Add more links as needed
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", link: "#" },
        { label: "Tutorials", link: "#" },
        // Add more links as needed
      ],
    },
    // Add more groups as needed
  ];

  return (
    <div>
      <HeaderMegaMenu />
      <Grid gutterMd={0}>
        <Grid.Col span="auto"></Grid.Col>
        <Grid.Col span={5}>
          <CardsCarousel />
          <div style={{ marginTop: "20px" }}>
            {tableData.length > 0 ? (
              <TableSort data={tableData}></TableSort>
            ) : (
              <Text weight={500} align="center">g
                Nothing found
              </Text>
            )}
          </div>
        </Grid.Col>
        <Grid.Col span={2}>
          <div style={{ marginLeft: "20px", marginRight: "20px" }}>
            <StatsRingCard
              title={test[0].title}
              total={test[0].total}
              completed={test[0].completed}
              stats={test[0].stats}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <ProgressCardColored />
          </div>
        </Grid.Col>
        <Grid.Col span="auto"></Grid.Col>
      </Grid>
      <FooterLinks data={footerData} />
    </div>
  );
}