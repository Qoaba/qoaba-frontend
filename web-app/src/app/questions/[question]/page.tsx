"use client";

import { useEffect, useState } from "react";
import { NotFoundTitle } from "./404page";
import { HeaderMegaMenu } from "../Header";
import { FaqSimple } from "./dropdown";

import {
  Loader,
  Container,
  SimpleGrid,
  Center,
  SegmentedControl,
} from "@mantine/core";
import { SystemQuestions } from "./Test";
import { FeaturesCard } from "./FlashCard";
import { FooterLinks } from "../../components/Footer";
import { useSession } from "next-auth/react";

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

interface NavbarSegmentedProps {
  setSelectedTab: (value: "flash" | "learn" | "test" | "match") => void;
}

function NavbarSegmented({ setSelectedTab }: NavbarSegmentedProps) {
  const [section, setSection] = useState<"flash" | "learn" | "test" | "match">(
    "flash"
  );

  const handleTabChange = (value: "flash" | "learn" | "test") => {
    setSection(value);
    setSelectedTab(value);
  };

  return (
    <SegmentedControl
      value={section}
      onChange={handleTabChange}
      transitionTimingFunction="ease"
      fullWidth
      data={[
        { label: "Flash Card", value: "flash" },
        { label: "Learn", value: "learn" },
        { label: "Test", value: "test" },
        { label: "Match", value: "match" },
      ]}
    />
  );
}

export default function Page({ params }: { params: { question: string } }) {
  const { data: session } = useSession();
  const [questionData, setQuestionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<
    "flash" | "learn" | "test" | "match"
  >("flash");

  useEffect(() => {
    const apiUrl = `http://localhost:8000/api/questions/${params.question}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [params.question]);

  useEffect(() => {
    if (!isLoading && session) {
      const postData = {
        userId: session.user.id,
        questionId: params.question,
        timeStamp: new Date().toISOString(),
        isCorrect: false,
      };

      const apiUrl = `http://localhost:8000/api/stats/attempt`;

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }).then((response) => response.json());
    }
  }, [isLoading, session, params.question]);

  if (isLoading) {
    return (
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Loader size="xl" />
      </Container>
    );
  }

  if (!questionData) {
    return <NotFoundTitle />;
  }

  return (
    <div>
      <HeaderMegaMenu />
      <Center>
        <SimpleGrid w={750} cols={1} spacing="lg">
          <div style={{ paddingBottom: "20px" }}>
            <NavbarSegmented setSelectedTab={setSelectedTab} />
          </div>
        </SimpleGrid>
      </Center>
      <Center>
        <SimpleGrid w={750} cols={1} spacing="lg">
          {selectedTab === "flash" && (
            <FeaturesCard questionData={questionData} />
          )}
          {selectedTab === "learn" && <FaqSimple questionData={questionData} />}
          {selectedTab === "test" && (
            <SystemQuestions questionData={questionData} />
          )}
        </SimpleGrid>
      </Center>
      {/* Remove Padding if/when the questions push the footer to the bottom*/}
      <div style={{ marginTop: "400px" }}>
        <FooterLinks data={footerData} />
      </div>
    </div>
  );
}
