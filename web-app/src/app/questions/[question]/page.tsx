"use client";

import { useEffect, useState } from "react";
import { NotFoundTitle } from "./404page";
import { HeaderMegaMenu } from "../Header";
import { FaqSimple } from "./dropdown";
import { Loader, Container } from "@mantine/core";

export default function Page({ params }: { params: { question: string } }) {
  const [questionData, setQuestionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <FaqSimple questionData={questionData} />
    </div>
  );
}
